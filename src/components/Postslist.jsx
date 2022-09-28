import React, { useState } from "react";
import Postitem from "./Postitem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const Postslist = ({ posts, title, remove }) => {

    if (!posts.length) {
        return (<h2 style={{ textAlign: "center" }}>Посты не найдены</h2>)
    }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{title}</h1>
        <TransitionGroup>
            {posts.map((post, index) => (
                <CSSTransition
                    key={post.id}
                    timeout={500}
                    classNames='post'
                >
                <Postitem
                    remove={remove}
                    post={post}

                    number={index + 1}
                />
                </CSSTransition>
            ))}
        </TransitionGroup>

    </div>
  );
};

export default Postslist;
