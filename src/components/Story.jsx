import React, { useEffect, useState } from "react";
import { getItem } from "../services/hacker-news-api";
import Comment from "./Comment.jsx";
import StoryPreviewPlaceholder from "./StoryPreviewPlaceholder";
import LazyLoad from "react-lazyload";
import { timestampToTime } from "../utils/normalization";

const Story = ({
  match: {
    params: { id },
  },
}) => {
  const [story, setStory] = useState({});
  const [comments, setComments] = useState([]);
  const [seconds, setSeconds] = useState(59);

  //таймер 60s

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleUpdateComments().then(() => setSeconds(59));
    }
    return () => {
      clearTimeout(timer);
    };
  }, [setSeconds, seconds]);

  useEffect(() => {
    const storyRequest = async () => {
      const response = await getItem(id);
      if (response.kids) {
        setComments(response.kids);
      }
      setStory(response);
    };
    storyRequest().then(() => {});
  }, [id, setComments]);

  const renderComments = () =>
    comments.map((commentID) => (
      <LazyLoad key={commentID} placeholder={<StoryPreviewPlaceholder />}>
        <Comment key={commentID} commentID={commentID} />
      </LazyLoad>
    ));

  const handleUpdateComments = async () => {
    const response = await getItem(id);
    if (response.kids) {
      setComments(response.kids);
    }
    setStory(response);
    setSeconds(59);
  };

  const renderTitle = () => {
    if (story.title) {
      return (
        <h2>
          {story.title}
            <br/>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link link-source"
            href={story.url}
          >
            ссылка на новость
          </a>
        </h2>
      );
    }
    return (
      <div className="skeleton-item justify-center">
        <div
          className="skeleton-block skeleton-block-title"
          style={{ maxWidth: "500px" }}
        >
          {" "}
        </div>
      </div>
    );
  };

  const renderInfo = () => {
    if (story.by) {
      return (
        <section className="story-info justify-center">
          <div>
            <span>Рейтинг</span> {story.score}
          </div>
          <div>
            <span>Автор:</span> {story.by}
          </div>
          <div>
            <span>Дата публикации:</span> {timestampToTime(story.time)}
          </div>
        </section>
      );
    }
    return (
      <div className="skeleton-item justify-center">
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "50px" }}
        >
          {" "}
        </div>
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "100px" }}
        >
          {" "}
        </div>
        <div
          className="skeleton-block skeleton-block-info"
          style={{ maxWidth: "150px" }}
        >
          {" "}
        </div>
      </div>
    );
  };

  return (
    story && (
      <main>
        <article>
          {renderTitle()}
          {renderInfo()}
          <div className="comments-header">
            <div className="comment-counter-wrapper">
              <span>Комментарии {story.descendants ?? 0}</span>
            </div>
            <button
              className="button button-animated"
              onClick={handleUpdateComments}
            >
              <span>
                <span>Обновить {seconds}</span>
              </span>
            </button>
          </div>
          <section className="comments-list">
            {comments.length > 0 ? (
              renderComments()
            ) : (
              <h3 className="h3">Коментариев нет</h3>
            )}
          </section>
        </article>
      </main>
    )
  );
};

export default Story;
