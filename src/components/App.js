import React, { useState } from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import NavbarLink from "./Navbar"
import TodoList from "./TodoList"

function App() {
  const [search, setSearch] = useState("")
  const onSearch = (data) => {
    setSearch(data)
  }
  return (
    <>

      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <NavbarLink
              onSearch={onSearch}
            />
            <AuthProvider>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/todolist"
                  component={() => <TodoList search={search} />} />
              </Switch>
            </AuthProvider>
          </Router>
        </div>
      </Container>
    </>
  )
}

export default App