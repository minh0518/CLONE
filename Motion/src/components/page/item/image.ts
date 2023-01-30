export class ImageComponent {
    private element: HTMLElement;
  
    constructor(title: string, url: string) {
      //템플릿 형태로 간편하게 태그를 만듦
      const template = document.createElement('template');
      template.innerHTML = `
          <section class="image">
            <div class="image_holder">
              <img class="image_thumbnail" />
            </div>
            <p class="image_title"></p>
          </section>`;
  
      // 템플릿 안에 필요한 요소에만 접근해서 필요한 것들만 업데이트
      // template안에 있는 , content안에 있는 첫번째 자식 > section태그
      this.element = template.content.firstElementChild! as HTMLElement;
  
      // element를 지정했으므로 img태그에 속성 값들 추가
      const imageElement = this.element.querySelector('.image_thumbnail')! as HTMLImageElement;
      imageElement.src = url;
      imageElement.alt = title;
  
      // element를 지정했으므로 p태그에 내용 추가
      const titleElement = this.element.querySelector('.image_title')! as HTMLParagraphElement;
      titleElement.textContent = title;
    }
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
      parent.insertAdjacentElement(position, this.element);
    }
  }