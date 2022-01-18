var micMuted=null;
var cameraMuted=null;
var screenShare=null;
var ptpOpen=null;
var chatOpen=null;
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

function toggleChat(ev){
    ev.preventDefault();
    if(chatOpen){
        //closeChat()
        //chatBox.style.display="none";
        if(ptpOpen){
            $("#chatBox").animate({
                height:'toggle'
            },300);
        }else{
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){chatBox.style.display='none'});
        }
        chatOpen=false;
        chatBtn.classList.remove("bg-blue");
    }
    else{
        //openChat()
        if(ptpOpen){
            $("#chatBox").animate({
                height:'toggle'
            },200);
        }else{
            chatBox.style.display='flex'
            $(".sidebar").animate({
                width:'toggle'
            },300);
        }
        //chatBox.style.display="flex";
        chatOpen=true;
        chatBtn.classList.remove('alert-badge');
        chatBtn.classList.add("bg-blue");
    }
}

function togglePtps(ev){
    ev.preventDefault();
    if(ptpOpen){
        //closePtp()
        //ptpBox.style.display="none";
        if(chatOpen){
            $("#ptpBox").animate({
                height:'toggle'
            },300);
        }else{
            $(".sidebar").animate({
                width:'toggle'
            },300,function(){ptpBox.style.display='none'});
        }
        ptpOpen=false;
        ptpBtn.classList.remove("bg-blue");
    }
    else{
        //openPtp()
        if(chatOpen){
            $("#ptpBox").animate({
                height:'toggle'
            },200);
        }else{
            ptpBox.style.display='flex'
            $(".sidebar").animate({
                width:'toggle'
            },300);
        }
        //ptpBox.style.display="flex";
        ptpOpen=true;
        ptpBtn.classList.add("bg-blue");
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
    micMuted=true;
    cameraMuted=true;
    screenShare=false;
    ptpOpen=true;
    chatOpen=true;
    cameraBtn=document.getElementById('cameraBtn');
    ssBtn=document.getElementById('ssBtn');
    chatBtn=document.getElementById('chatBtn');
    ptpBtn=document.getElementById('ptpBtn');
    chatBox=document.getElementById('chatBox');
    ptpBox=document.getElementById('ptpBox');

    tippy("#chatBtn", {
        content: "Chat",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',
      });

    tippy("#ptpBtn", {
        content: "Participants",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',
      });

    tippy("#cameraBtn", {
        content: "Camera",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',
      });

    tippy("#micBtn", {
        content: "Mic",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',
      });

    tippy("#ssBtn", {
        content: "Screenshare",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',
      });

    tippy("#hangupBtn", {
        content: "Hang up",
        animation: 'scale',
        arrow: true,
        placement:'top',
        theme: 'light-border',    
      });
    
      tippy("div.content", {
        content: '<strong>Bolded <span style="color: aqua;">content</span></strong>',
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