//all images are loaded
eventListeners();
function eventListeners(){
    const ui= new UI();
    window.addEventListener('load', function () {
        ui.hidePreloader();
    })
    document.querySelector('.navBtn').addEventListener('click', function () {
        ui.showNav();
    })

    const links = document.querySelectorAll('.img-item_icon');
    links.forEach(function(item){
        item.addEventListener('click',function(event){
            ui.showModal(event)
        })
    })

    // document.querySelector('.work-modal_close').addEventListener('click',
    // function(){
    //     ui.closeModal();
    // })

}

function UI(){

}

UI.prototype.hidePreloader = function(){
    document.querySelector('.preloader').style.display="none";
}

UI.prototype.showNav = function(){
    document.querySelector('.nav').classList.toggle('nav--show');
}

UI.prototype.showModal = function(event){
    if(event.target.parentElement.classList.contains('img-item_icon')){
        let id=event.target.parentElement.dataset.id;
        const modal = document.querySelector('.img-modal');
        const modalItem = document.querySelector('.img-modal_item');

        modal.classList.add('img-modal-show');
        modalItem.style.backgroundImage= `url(img/work-${id}.jpeg)`;
    }
}

// UI.prototype.closeModal = function(){
//     document.querySelector('.img-modal').classList.remove('img-modal-show');
// }


const ui= new UI();