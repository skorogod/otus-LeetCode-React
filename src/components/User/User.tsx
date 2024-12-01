import { Form, LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import type { User } from "../../shared/interfaces/User";
import { userService } from "../../api/services/userService";
import './User.css'


type Params = {
    id: number
}

export async function loader({params}: LoaderFunctionArgs<{params: Params}>) {
    const user = await userService.getUser(Number(params.id))
    return user
}

export default function User() {

    const user = useLoaderData() as User
  return (
    <div id="user">
      <div>
        <img
          key={user.image}
          src={
            user.image ||
            `https://robohash.org/${user.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {user.username ? (
            <>
              {user.username}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite user={user} />
        </h1>

        <div className="user-info">
          <p>E-mail: </p>
          <p>
            <a
              target="_blank"
              href={`mailto:${user.email}`}
            >
              {user.email}
            </a>
          </p>
          <p>Рейтинг:</p>
          <p>{user.reputation}</p>
        </div>

        <div className="user-actions">
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={(event) => {
              if (
                !confirm(
                  "Please confirm you want to delete this record."
                )
              ) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({ user }: {user: User}) {
  const favorite = user.favorite;
  return (
    <Form method="post">
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={
          favorite
            ? "Remove from favorites"
            : "Add to favorites"
        }
      >
        {favorite ? "★" : "☆"}
      </button>
    </Form>
  );
}