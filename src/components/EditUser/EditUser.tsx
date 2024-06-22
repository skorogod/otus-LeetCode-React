import { Form, useLoaderData } from "react-router-dom";
import type { User } from "../../shared/interfaces/User";
import './EditUser.css'
import { UpdateParams, userService } from "../../api/services/userService";

type ActionParams = {
    id: number,
}

export async function action({request, params} : {request: Request, params: ActionParams}) {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await userService.updateUser(params.id, updates)
}

export default function EditUser() {
  const user = useLoaderData() as User;

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
            <button type="button">Cancel</button>
        </p>
    </Form>
  );
}