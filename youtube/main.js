const moreBtn=document.querySelector('.info .metadata .moreBtn')
const title=document.querySelector('.info .metadata .title')

moreBtn.addEventListener('click',()=>{
    title.classList.toggle('clamp')
    moreBtn.classList.toggle('clicked')
})