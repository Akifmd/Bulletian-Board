import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getAllCategory } from "../Services/getcategory";
import { Link, useParams } from "react-router-dom";
import { getCurrentUserDetail, islogin } from "../auth";

export const CategoryDisplay = () => {
  const [user, setUser] = useState([]);
  const [login, setLogin] = useState(false);

  const [categories, SetCategories] = useState([]);
  useEffect(() => {
    getAllCategory().then((data) => {
      console.log(data);
      SetCategories([...data]);
    });
  }, []);
  useEffect(() => {
    setLogin(islogin());
    setUser(getCurrentUserDetail());
  }, [login]);
  return (
    <>
      <ListGroup>
        {login && (
          <ListGroupItem
            tag={Link}
            to={"/" + user.UserName + "/" + user.Email}
            action={true}
            className="border-0"
          >
            CategoryDisplay
          </ListGroupItem>
        )}
        {!login && (
          <ListGroupItem tag={Link} to={"/"} action={true} className="border-0">
            CategoryDisplay
          </ListGroupItem>
        )}
        {categories &&
          categories.map((cat, index) => {
            return (
              <ListGroupItem
                tag={Link}
                to={"/categories/" + cat.categoryName}
                key={index}
                className="border-0 shadow-0 mt-1"
              >
                {cat.categoryName}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </>
  );
};
