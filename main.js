var micMuted=true;
var cameraMuted=true;
var screenShare=false;
var ptpOpen=false;
var chatOpen=false;
var cameraBtn=null;
var ssBtn=null;
var chatBtn=null;
var ptpBtn=null;
var chatBox=null;
var ptpBox=null;

function toggleMic(ev){
    ev.preventDefault();
    if(micMuted){
        micMuted=false;
        micBtn.children[0].classList.remove("disabled");
        micBtn.children[0].innerHTML=`<i class="fas fa-lg fa-microphone-alt"></i>`;
    }
    else{
        micMuted=true;
        micBtn.children[0].classList.add("disabled");
        micBtn.children[0].innerHTML=`<i class="fas fa-lg fa-microphone-alt-slash"></i>`;
    }
}

function toggleCamera(ev){
    ev.preventDefault();
    if(cameraMuted){
        cameraMuted=false;
        cameraBtn.children[0].classList.remove("disabled");
        cameraBtn.children[0].innerHTML=`<i class="fas fa-video"></i>`;
    }
    else{
        cameraMuted=true;
        cameraBtn.children[0].classList.add("disabled");
        cameraBtn.children[0].innerHTML=`<i class="fas fa-video-slash"></i>`;
    }
}

function closeChat(){
    if(ptpOpen){
            $("#chatBox").animate({
                height:'toggle'
            },function(){
                this.style.display='none';
                chatOpen=false;
                chatBtn.classList.remove("bg-blue");
            });
        }else{
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){
                this.style.display='none';
                chatBox.style.display='none';
                chatOpen=false;
                chatBtn.classList.remove("bg-blue");
            });
        }
}

function openChat(){
    if(ptpOpen){
            $("#chatBox").animate({
                height:'toggle'
            },200,function(){
                this.style.display='flex';
                chatOpen=true;
                chatBtn.classList.remove('alert-badge');
                chatBtn.classList.add("bg-blue");
            });
        }else{
            ptpBox.style.display='none';
            chatBox.style.display='flex';
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){
                this.style.display='flex';
                chatOpen=true;
                chatBtn.classList.remove('alert-badge');
                chatBtn.classList.add("bg-blue");
            });
        }
}

function closePtp(){
    if(chatOpen){
            $("#ptpBox").animate({
                height:'toggle'
            },function(){
                this.style.display='none';
                ptpOpen=false;
                ptpBtn.classList.remove("bg-blue");
            });
        }else{
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){
                this.style.display='none';
                ptpBox.style.display='none';
                ptpOpen=false;
                ptpBtn.classList.remove("bg-blue");
            });
        }
}

function openPtp(){
    if(chatOpen){
            $("#ptpBox").animate({
                height:'toggle'
            },200,function(){
                this.style.display='flex';
                ptpOpen=true;
                ptpBtn.classList.remove('alert-badge');
                ptpBtn.classList.add("bg-blue");
            });
        }else{
            chatBox.style.display='none';
            ptpBox.style.display='flex';
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){
                this.style.display='flex';
                ptpOpen=true;
                ptpBtn.classList.remove('alert-badge');
                ptpBtn.classList.add("bg-blue");
            });
        }
}

function toggleChat(ev){
    ev.preventDefault();
    if(chatOpen){
        closeChat()
    }
    else{
        openChat()       
    }
}

function togglePtps(ev){
    ev.preventDefault();
    if(ptpOpen){
        closePtp()
    }
    else{
        openPtp()
    }
}

function toggleSS(ev){
    ev.preventDefault();
    if(screenShare){
        //closeSS()
        screenShare=false;
        ssBtn.classList.remove("bg-blue");
    }
    else{
        //openSS()
        screenShare=true;
        ssBtn.classList.add("bg-blue");
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    
    cameraBtn=document.getElementById('cameraBtn');
    ssBtn=document.getElementById('ssBtn');
    chatBtn=document.getElementById('chatBtn');
    ptpBtn=document.getElementById('ptpBtn');
    chatBox=document.getElementById('chatBox');
    ptpBox=document.getElementById('ptpBox');

    
    tippy("div.content", {
        content: '<strong>Bolded <span style="color: orange;">content</span></strong>',
        allowHTML: true,
        animation: 'scale',
        arrow: true,
        placement:'bottom',
        trigger: 'click',
        theme: 'light-border',
        interactive:true,
        inertia: true,
    });
});


window.addEventListener("load", function () {

        // select parent of dish
        let scenary = document.getElementsByClassName("Scenary")[0];

        // create dish
        let dish = new Dish(scenary);

        // set controls (optional)
        let controls = new Controls(dish, scenary);
        //controls.append();

        // render dish
        dish.append();

        // resize the cameras
        dish.resize();

        // resize event of window
        // window.addEventListener("resize", function () {

        //     // resize event to dimension cameras
        //     dish.resize();

        // });

        const resizeObserver = new ResizeObserver(entries => 
            dish.resize()
        )

        // start observing a DOM node
        resizeObserver.observe(dish._dish);

}, false);