import { useLoaderData, Outlet } from 'react-router-dom';
import { userService } from '../../api/services/userService';
import type { User } from '../../shared/interfaces/User';
import { Link } from 'react-router-dom';
import './Users.css'

export async function loader() {
    const users = await userService.getUsers()
    return users
}

export default function Users() {
  console.log('render ')
  const users = useLoaderData() as User[]
  console.log(users)
  console.log(users.length)
    return (
      <>
        <div id="sidebar">
          <h1>USERS</h1>
          <div>
            <form id="search-form" role="search">
              <input
                id="q"
                aria-label="Search users"
                placeholder="Search"
                type="search"
                name="q"
              />
              <div
                id="search-spinner"
                aria-hidden
                hidden={true}
              />
              <div
                className="sr-only"
                aria-live="polite"
              ></div>
            </form>
            {/* <form method="post">
              <button type="submit">New</button>
            </form> */}
          </div>
          <nav>
          {users.length ? (
            <ul>
              {users.map((user) => {return (
                <li key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <p className='user-link__info'>
                      {user.username ? (
                        <>
                          {user.username}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}
                    </p>
                    {user.reputation}
                    {user.favorite && <span>★</span>}
                  </Link>
                </li>
              )})}
            </ul>
          ) : (
            <p>
              <i>No users</i>
            </p>
          )}
        </nav>
        </div>
        <div id="detail">
          <Outlet></Outlet>
        </div>
      </>
    );
  }