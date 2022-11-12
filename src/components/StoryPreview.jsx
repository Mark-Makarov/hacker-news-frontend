import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getItem } from "../services/hacker-news-api";
import StoryPreviewPlaceholder from "./StoryPreviewPlaceholder";
import { timestampToTime } from "../utils/normalization";

const StoryPreview = ({ id }) => {
  const [story, setStory] = useState({});
  const [requestStatus, setRequestStatus] = useState("fetching");

  useEffect(() => {
    setRequestStatus("fetching");
    const storyRequest = async () => {
      const response = await getItem(id);
      setStory(response);
    };
    storyRequest().then(() => setRequestStatus("finished"));
  }, [id]);

  return !story || requestStatus === "fetching" ? (
    <StoryPreviewPlaceholder />
  ) : (
    <article className="story-preview">
      <Link className="link" to={`/${story.id}`}>
        {story.title}
      </Link>
      <section className="story-info">
        <div>
          <span>Рейтинг:</span> {story.score}
        </div>
        <div>
          <span>Автор</span> {story.by}
        </div>
        <div>
          <span>Дата публикации:</span> {timestampToTime(story.time)}
        </div>
        <div>
          <span>Коментарии:</span> {story.descendants}
        </div>
      </section>
    </article>
  );
};

export default StoryPreview;
