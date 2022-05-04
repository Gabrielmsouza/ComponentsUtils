import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {
  capturaTela: any;
  cameraStream: any;

  constructor() { }

  facingMode: boolean = true;

  ngOnInit(): void {
    this.iniciarCamera(this.facingMode);
  }

  ngOnDestroy(): void {
    this.fecharCamera();
  }

  teste(){
    console.log('oaapasasas');

  }

  async iniciarCamera(cameraFrontal: boolean): Promise<void> {
    this.facingMode = cameraFrontal;
    let facingMode = cameraFrontal ? "user" : "environment";

    const video = this.retornarWebCam();

    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    if (navigator.mediaDevices.getUserMedia) {
      const options = {
        audio: false,
        video: { facingMode },
        width: {
          min: 1280,
        },
        height: {
          min: 720,
        },
      };

      try {
        if (this.cameraStream) {
          this.fecharCamera();
        }

        this.cameraStream = await navigator.mediaDevices.getUserMedia(options);
        video.srcObject = this.cameraStream;
      } catch (error) {
        console.log("Sem permissão no uso de camera!");
      }
    }
  }

  async capturar(): Promise<void> {
    // const video = this.retornarWebCam();

    // const canvas = document.createElement("canvas");
    // canvas.width = video.videoWidth;
    // canvas.height = video.videoHeight;

    // const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // this.capturaTela = canvas.toDataURL("image/jpeg");
    return console.log('aaaa');

  }


  fecharCamera(): void {
    const tracks = this.cameraStream.getTracks();

    //tracks.forEach((track) => track.stop());
  }

  retornarWebCam(): any {
    return document.querySelector("#webcam") as any;
  }

}
