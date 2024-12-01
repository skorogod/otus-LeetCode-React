import { ActionFunctionArgs, Form, useLoaderData, useNavigate } from "react-router-dom";
import type { User } from "../../shared/interfaces/User";
import './EditUser.css'
import { UpdateParams, userService } from "../../api/services/userService";
import {store} from '../../store/index'
import { usersActions } from "../../store/usersReducer";

type ActionParams = {
    id: number,
}

export async function action({request, params} : ActionFunctionArgs<{request: Request, params: ActionParams}>) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    store.dispatch(usersActions.updateUser({id: Number(params.id), updates}))
}

export default function EditUser() {
  const user = useLoaderData() as User;
  const navigate = useNavigate()

  return (
    <Form className="form edit-user-form" method="post" id="contact-form">
        <div className="edit-user-form__body">
            <label htmlFor="username">Username:</label>
            <input
                id="username"
                placeholder="username"
                aria-label="username"
                type="text"
                name="username"
                defaultValue={user.username}
            />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                placeholder="email"
                aria-label="email"
                type="email"
                name="email"
                defaultValue={user.email}
            />
            <label htmlFor="rating">Rating:</label>
            <input
                type="text"
                name="rating"
                placeholder="rating"
                defaultValue={user.reputation}
                />
        </div>
        <p className="form__buttons">
            <button type="submit">Save</button>
            <button onClick={() => {
                navigate(-1)
            }} type="button">Cancel</button>
        </p>
    </Form>
  );
}