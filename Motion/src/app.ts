import { ImageComponent } from './components/page/item/image.js';
import { PageComponent } from './components/page/page.js';
                  //자동 import하면 .js가 생략되므로 같이 작성해줍니다

class App {
  private readonly page: PageComponent;

  //어플리케이션을 추가할 최상위 루트 요소
  constructor(appRoot: HTMLElement) {

    this.page = new PageComponent();
    this.page.attachTo(appRoot);
    // PageComponent가 상속하고 있는 baseComponents의 attachTo() 사용

    const image=new ImageComponent('Image Title','https://picsum.photos/200/300')
    image.attachTo(appRoot,'beforeend')
    // ImageComponent가 상속하고 있는 baseComponents의 attachTo() 사용
                            
  }
}

// 생성자 appRoot로써 .document 요소를 사용
// 즉 .document 요소에 PageComponent객체의 element가 
// 추가 되는 것
new App(document.querySelector('.document')! as HTMLElement)
//프로젝트를 실행하면 이 부분부터 시작이 되는 것입니다