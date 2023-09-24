import React from "react";
import { Button, Card, CardBody, CardText } from "reactstrap";
import { Link, useParams } from "react-router-dom";

import { islogin } from "../../auth";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const { UserName } = useParams();
  const { Email } = useParams();
  const navigate = useNavigate();

  const deletePostBtn = () => {
    islogin()
      ? navigate(
          "/deletepost/" + props.post1.pId + "/" + UserName + "/" + Email
        )
      : alert("Login to Delete The Posts");
  };

  const updatePostbtn = () => {
    islogin()
      ? navigate(
          "/updatepost/" + props.post1.pId + "/" + UserName + "/" + Email
        )
      : alert("Login to Update The Posts");
  };
  return (
    <Card className="border-10 shadow-sm mt-3">
      <CardBody className="ps-4">
        <h3>{props.post1.post}</h3>
        <CardText
          dangerouslySetInnerHTML={{
            __html: props.post1.postDetials.substring(0, 20) + ".............",
          }}
        ></CardText>

        <div className="container text-right ms-2">
          <Link
            className="btn btn-secondary ms-2 "
            to={
              "/postdetialss/" + props.post1.pId + "/" + UserName + "/" + Email
            }
          >
            Read more.....
          </Link>

          {islogin() && props.post1.userName == UserName ? (
            <>
              <Button className="btn btn-danger  ms-2" onClick={deletePostBtn}>
                Delete
              </Button>
              <Button
                className="btn btn-secondary  ms-2"
                onClick={updatePostbtn}
              >
                Update
              </Button>
            </>
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default Post;
