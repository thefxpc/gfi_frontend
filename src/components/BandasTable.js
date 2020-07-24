import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import MaterialTable from "material-table";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import addBanda from "../api/addBanda";
import editBanda from "../api/editBanda";
import deleteBanda from "../api/deletebanda";

class BandasTable extends Component {
  deleteBanda = (oldData) => {
    this.props.deleteBanda(oldData.bandaId);
  };

  editBanda = (newData) => {
    let editBandRequest = {
      bandaId: newData.bandaId,
      metalTipoTipo: newData.catTipoMetal.tipo,
      nombre: newData.nombre,
      discoLanzados: newData.discoLanzados,
      fechaFundacion: new Date(newData.fechaFundacion).getTime(),
    };
    this.props.editBanda(editBandRequest);
  };

  addBanda = (newData) => {
    console.log("newData", newData);
    let addBandRequest = {
      metalTipoTipo: newData.catTipoMetal.tipo,
      nombre: newData.nombre,
      discoLanzados: newData.discoLanzados,
      fechaFundacion: new Date(newData.fechaFundacion).getTime(),
    };
    this.props.addBanda(addBandRequest);
  };

  render() {
    let { bandas, cat_tipo_banda } = this.props.ui;

    let items;
    if (cat_tipo_banda) {
      items = cat_tipo_banda.map((category, index) => {
        return (
          <MenuItem key={category.metalTipoId} value={category.tipo}>
            {category.tipo}
          </MenuItem>
        );
      });
    }

    let columns = [
      {
        title: "Nombre",
        field: "nombre",
        validate: (rowData) =>
          rowData.nombre === "" || typeof rowData.nombre === "undefined"
            ? { isValid: false, helperText: "El nombre no debe estar vacio" }
            : true,
      },
      {
        title: "Tipo de metal",
        field: "catTipoMetal.tipo",
        validate: (rowData) =>
          typeof rowData.catTipoMetal === "undefined"
            ? {
                isValid: false,
                helperText: "Selecciona una categoria",
              }
            : true,
        editComponent: (props) => (
          <FormControl>
            <Select
              labelId="select-label"
              id="simple-select"
              name="selectedMetalCategory"
              value={typeof props.value === "undefined" ? "" : props.value}
              onChange={(e) => props.onChange(e.target.value)}
            >
              {items}
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Fecha de fundación",
        field: "fechaFundacion",
        type: "date",
        validate: (rowData) =>
          typeof rowData.fechaFundacion === "undefined"
            ? {
                isValid: false,
                helperText: "La fecha de fundación es obligatoria",
              }
            : true,
      },
      {
        title: "Discos publicados",
        field: "discoLanzados",
        type: "numeric",
        validate: (rowData) =>
          typeof rowData.discoLanzados === "undefined" ||
          rowData.discoLanzados < 0
            ? {
                isValid: false,
                helperText: "Los discos son obligatorios y mayor que 0",
              }
            : true,
      },
    ];
    return (
      <Paper>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={3}
          alignItems="flex-start"
        >
          <Grid item xs>
            <MaterialTable
              title="Bandas de metal"
              columns={columns}
              data={bandas}
              editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve, reject) => {
                    this.addBanda(newData);
                    resolve();
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve, reject) => {
                    this.editBanda(newData);
                    resolve();
                  }),
                onRowDelete: (oldData) =>
                  new Promise((resolve, reject) => {
                    this.deleteBanda(oldData);
                    resolve();
                  }),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addBanda: (data) => {
    dispatch(addBanda(data));
  },
  deleteBanda: (data) => {
    dispatch(deleteBanda(data));
  },
  editBanda: (data) => {
    dispatch(editBanda(data));
  },
});

const mapStateToProps = (state) => {
  return { ui: state.ui };
};

export default connect(mapStateToProps, mapDispatchToProps)(BandasTable);
