var micMuted=true;
var cameraMuted=true;
var screenShare=false;
var ptpOpen=true;
var chatOpen=true;
var cameraBtn=document.getElementById('cameraBtn');
var ssBtn=document.getElementById('ssBtn');
var chatBtn=document.getElementById('chatBtn');
var ptpBtn=document.getElementById('ptpBtn');
var chatBox=document.getElementById('chatBox');
var ptpBox=document.getElementById('ptpBox');


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