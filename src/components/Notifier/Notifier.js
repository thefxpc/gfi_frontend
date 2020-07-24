import React from "react";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { removeSnackbar } from "../../actions/notificationActions";

let displayed = [];

const Notifier = (props) => {
  const { notifications } = props.notifications;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { removeSnackbarAction } = props;

  const storeDisplayed = (id) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach(
      ({ key, message, options = {}, dismissed = false }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key);
          return;
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return;

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey);
            }
          },
          onExited: (event, myKey) => {
            // removen this snackbar from redux store
            removeSnackbarAction(myKey);
            removeDisplayed(myKey);
          },
        });

        // keep track of snackbars that we've displayed
        storeDisplayed(key);
      }
    );
  }, [notifications, closeSnackbar, enqueueSnackbar, removeSnackbarAction]);

  return null;
};

const mapStateToProps = (state) => {
  return { notifications: state.notifications };
};

const mapDispatchToProps = (dispatch) => ({
  removeSnackbarAction: (myKey) => {
    dispatch(removeSnackbar(myKey));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
