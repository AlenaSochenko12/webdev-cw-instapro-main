//Модуль отрисовывает уже написанные посты
import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage } from "../index.js";

export function renderPostsPageComponent({ appEl }) {
  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const appHtml = posts
    .map((posts, index) => {
      return `
      <div class="page-container">
         <div class="header-container"></div>
           <ul class="posts">
             <li class="post">
                    <div class="post-header" data-user-id="${user.id}">
                        <img src="${
                          user.imageUrl
                        }" class="post-header__user-image">
                        <p class="post-header__user-name">${posts.user}</p>
                    </div>
                    <div class="post-image-container">
                      <img class="post-image" src="${user.imageUrl}">
                    </div>
                    <div class="post-likes">
                      <button data-post-id="${posts.id}" class="like-button">
                      ${
                        posts[index].isliked
                          ? "./assets/images/like-active.svg"
                          : ""
                      }
                      </button>
                      <p class="post-likes-text">
                        Нравится: <strong>2</strong>
                      </p>
                    </div>
                    <p class="post-text">
                      <span class="user-name">${posts.user}</span>
                      ${posts.description}
                    </p>
                    <p class="post-date">
                      ${posts.createdAt}
                    </p>
                  </li>
            < /ul>
       </div>`
    })
    .join("");

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
}