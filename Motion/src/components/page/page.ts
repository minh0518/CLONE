import { BaseComponent } from '../components.js';

                            //여긴 ul태그를 생성하니까 제네릭으로 HTMLUListElement
export class PageComponent extends BaseComponent<HTMLUListElement> {

  // 내부적으로 가지고 있을 필요 x
  // private element: HTMLUListElement;

  constructor() {
    super('<ul class="page">This is PageComponent!</ul>');
  }

  // 내부적으로 가지고 있을 필요 x
  // attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
  //   parent.insertAdjacentElement(position, this.element);
  // }
}
