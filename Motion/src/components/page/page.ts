export class PageComponent {

    // html로 된 ul태그들을 담는 변수 (카드목록들)
    private element: HTMLUListElement;
  
    constructor() {
      this.element = document.createElement('ul'); // ul태그를 만듦
      this.element.setAttribute('class', 'page'); // 이 태그의 class='page'
      this.element.textContent = 'This is PageComponent'; // 태그 내용
    }
  
    // 외부에서 페이지 컴포넌트를 만들어서 필요한 곳에다가 추가하기 위한 메소드
    // 인자 parent는 어떤 html요소도 받을 수 있고
    // 어떤 포지션에 추가할 수 있는지도 인자로 받음
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
      
      // insertAdjacentElement는 
      // parent컨테이너의 자식 요소로 position위치에 this.element를
      // 추가할 수 있는 ts 라이브러리
      parent.insertAdjacentElement(position, this.element);
    }
  }