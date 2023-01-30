import { BaseComponent } from '../../components.js';

export class ImageComponent extends BaseComponent<HTMLElement> {
  // 내부적으로 가지고 있을 필요 x
  // private element: HTMLElement;

  constructor(title: string, url: string) {
    super(`
      <section class="image">
        <div class="image_holder">
          <img class="image_thumbnail" />
        </div>
        <p class="image_title"></p>
      </section>`);

    //여기서 사용되는 this.element는 부모클래스인 BaseComponent의 element
    const imageElement = this.element.querySelector(
      '.image_thumbnail',
    )! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    // element를 지정했으므로 p태그에 내용 추가
    const titleElement = this.element.querySelector(
      '.image_title',
    )! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  // 내부적으로 가지고 있을 필요 x
  // attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
  //   parent.insertAdjacentElement(position, this.element);
  // }
}
