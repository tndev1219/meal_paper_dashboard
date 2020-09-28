import React, { useEffect, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useForm } from '@fuse/hooks';
import { FuseUtils } from '@fuse';
import * as Actions from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const defaultFormState = {
    current_password: '',
    password: '',
    repeat_password: ''
};

function ProfileDialog(props) {
    const dispatch = useDispatch();
    const ProfileDialog = useSelector(({ profileApp }) => profileApp.profile.profileDialog);
    const { form, handleChange, setForm } = useForm(defaultFormState);

    const initDialog = useCallback(
        () => {
            setForm({
                ...defaultFormState,
                ...ProfileDialog.data,
                id: FuseUtils.generateGUID()
            });

        },
        [ProfileDialog.data, setForm]
    );

    useEffect(() => {
        /**
        * After Dialog Open
        */
        if (ProfileDialog.props.open) {
            initDialog();
        }

    }, [ProfileDialog.props.open, initDialog]);

    function closeComposeDialog() {
        dispatch(Actions.closeProfileDialog());
    }

    function canBeSubmitted() {
        return (
            form.current_password.length > 0 && form.password.length > 4 && form.repeat_password.length > 4 && form.password === form.repeat_password
        );
    }

    function handleSubmit(event) {
        event.preventDefault();

        dispatch(Actions.updatePassword(form));

        closeComposeDialog();
    }

    return (
        <Dialog
            classes={{ paper: "m-24" }}
            {...ProfileDialog.props}
            onClose={() => {
                closeComposeDialog()
            }}
            fullWidth
            maxWidth="xs"
        >

            <AppBar position="static" elevation={1}>
                <Toolbar className="flex w-full">
                    <Typography variant="subtitle1" color="inherit">
                        パスワード変更
                    </Typography>
                </Toolbar>
            </AppBar>
            <form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
                <DialogContent classes={{ root: "pl-24 pt-24 pr-24" }}>

                    <div className="flex">
                        <TextField
                            className="mb-24"
                            label="現在のパスワード"
                            autoFocus
                            id="current_password"
                            name="current_password"
                            value={form.current_password}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <TextField
                            className="mb-24"
                            label="新しいパスワード"
                            autoFocus
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <TextField
                            className="mb-24"
                            label="パスワード確認"
                            id="repeat_password"
                            name="repeat_password"
                            value={form.repeat_password}
                            onChange={handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                </DialogContent>

                <DialogActions className="justify-between pl-24 pb-24 pr-24">
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!canBeSubmitted()}
                    >
                        保管
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default ProfileDialog;
