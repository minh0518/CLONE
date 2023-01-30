import { PageComponent } from './components/page/page.js';
//자동 import하면 .js가 생략되므로 같이 작성해줍니다
class App {
    //어플리케이션을 추가할 최상위 루트 요소
    constructor(appRoot) {
        this.page = new PageComponent();
        // PageComponent객체의 메소드 사용
        // appRoot에 PageComponent객체의 this.element를 추가
        this.page.attachTo(appRoot);
    }
}
// 생성자 appRoot로써 .document 요소를 사용
// 즉 .document 요소에 PageComponent객체의 element가 
// 추가 되는 것
new App(document.querySelector('.document'));
