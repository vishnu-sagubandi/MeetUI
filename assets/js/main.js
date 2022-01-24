let micMuted=true;
let cameraMuted=true;
let screenShare=false;
let ptpOpen=false;
let chatOpen=false;
let micBtn=null;
let cameraBtn=null;
let ssBtn=null;
let chatBtn=null;
let ptpBtn=null;
let chatBox=null;
let ptpBox=null;


//agora
let localTracks = [];
let remoteUsers = {};
let client=null;

async function toggleMic(ev){
    ev.preventDefault();
    micBtn.disabled=true;
    if(micMuted){
        await localTracks[0].setEnabled(true);
        await client.publish(localTracks[0])
        micMuted=false;
        micBtn.children[0].classList.remove("disabled");
        micBtn.children[0].innerHTML=`<i class="fas fa-lg fa-microphone-alt"></i>`;
    }
    else{
        await localTracks[0].setEnabled(false);
        micMuted=true;
        micBtn.children[0].classList.add("disabled");
        micBtn.children[0].innerHTML=`<i class="fas fa-lg fa-microphone-alt-slash"></i>`;
    }
    micBtn.disabled=false;
}

async function toggleCamera(ev){
    ev.preventDefault();
    cameraBtn.disabled=true;
    if(cameraMuted){
        await localTracks[1].setEnabled(true);
        await client.publish(localTracks[1]);
        localTracks[1].play(`me`);
        cameraMuted=false;
        cameraBtn.children[0].classList.remove("disabled");
        cameraBtn.children[0].innerHTML=`<i class="fas fa-video"></i>`;
    }
    else{
        await localTracks[1].setEnabled(false);
        localTracks[1].stop();
        cameraMuted=true;
        cameraBtn.children[0].classList.add("disabled");
        cameraBtn.children[0].innerHTML=`<i class="fas fa-video-slash"></i>`;
    }
    cameraBtn.disabled=false;
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

    micBtn=document.getElementById('micBtn');
    cameraBtn=document.getElementById('cameraBtn');
    ssBtn=document.getElementById('ssBtn');
    chatBtn=document.getElementById('chatBtn');
    ptpBtn=document.getElementById('ptpBtn');
    chatBox=document.getElementById('chatBox');
    ptpBox=document.getElementById('ptpBox');

    chatBtn.disabled=true;
    cameraBtn.disabled=true;
    micBtn.disabled=true;

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
        //let controls = new Controls(dish, scenary);
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

        const APP_ID = '9f2aaa708bcb48ca891cd5163695051e'
        const TOKEN = '0069f2aaa708bcb48ca891cd5163695051eIAAEna2ym6DypkVa+7WrVb/M9a6pDxfko4dPMbIbZizzkKDfQtYAAAAAEABfDyp7jfHvYQEAAQCM8e9h'
        const CHANNEL = 'demo'
        let UID;

        client = AgoraRTC.createClient({mode:'rtc', codec:'vp8'})

        let joinAndDisplayLocalStream = async () => {
            client.on('user-joined', handleUserJoined);
            client.on('user-published', handleUserPublished);
            client.on('user-left', handleUserLeft);

            UID = await client.join(APP_ID,CHANNEL,TOKEN,null);

            dish.add(`me`);

            localTracks = await AgoraRTC.createMicrophoneAndCameraTracks();

            if(micMuted){
                await localTracks[0].setEnabled(false);
            }else{
                client.publish(localTracks[0])
            }
            micBtn.disabled=false;

            if(cameraMuted){
                await localTracks[1].setEnabled(false);
            }else{
                localTracks[1].play(`me`);
                await client.publish(localTracks[1]) 
            }
            cameraBtn.disabled=false;
        }

        let handleUserJoined = async (user)=>{
            remoteUsers[user.uid]=user;
            let player = document.getElementById(`user-${user.uid}`)
            if (player != null){
                dish.delete(`user-${user.uid}`)
            }
            dish.add(`user-${user.uid}`);
        }

        let handleUserPublished = async (user, mediaType) => {
            remoteUsers[user.uid] = user;
            await client.subscribe(user, mediaType)

            if (mediaType === 'video'){
                let player = document.getElementById(`user-${user.uid}`)
                if (player == null){
                    dish.add(`user-${user.uid}`);
                    console.log('User joined');
                }

                user.videoTrack.play(`user-${user.uid}`)
            }

            if (mediaType === 'audio'){
                user.audioTrack.play()
            }
        }

        let handleUserLeft = async (user) => {
            console.log("User left")
            delete remoteUsers[user.uid];
            dish.delete(user.uid);
        }

        let leaveAndRemoveLocalStream = async () => {
            for (let i=0; localTracks.length > i; i++){
                localTracks[i].stop()
                localTracks[i].close()
            }

            remoteUsers={}

            await client.leave();
            //window.open('/', '_self');
        }


        const resizeObserver = new ResizeObserver(entries => 
            dish.resize()
        )

        // start observing a DOM node
        resizeObserver.observe(dish._dish);

        joinAndDisplayLocalStream();
        document.getElementById('hangupBtn').addEventListener('click',leaveAndRemoveLocalStream);

}, false);