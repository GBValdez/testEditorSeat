import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  configSeaLector,
  configSeatEditor,
  finishSeatInterface,
  NgxSeatEditorModule,
  NgxSeatLectorModule,
  notificationPlaneInterface,
  seatPosInterface,
} from 'ngx-seat-system';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgxSeatEditorModule, NgxSeatLectorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.http.get('avion.webp', { responseType: 'blob' }).subscribe(
      (res) => {
        this.config = {
          sizeSeat: 1,
          img: res,
          sections: [
            {
              id: 1,
              name: 'Profesional',
              color: {
                r: 0,
                g: 0,
                b: 255,
              },
            },
            {
              id: 2,
              name: 'Económico',
              color: {
                r: 0,
                g: 255,
                b: 0,
              },
            },
          ],
          areasPermit: [{ init: { x: 20, y: 20 }, end: { x: 80, y: 80 } }],
          permission: {
            // showTabGrid: false,
            // ShowTabPlane: false,
          },
        };
        this.configLector = {
          img: res,
          sizeWidth: 10,
          renderSeat: (seat) => {
            return {
              opacitySeat: seat.code === 'A1' ? 0.5 : 1,
            };
          },
          blockSeat: (seat) => {
            return seat.code === 'A1';
          },
          tooltip: (seat) => {
            return seat.code === 'A1' ? 'Ocupado' : 'Disponible';
          },
        };
      },
      (err) => {
        console.log(err);
      }
    );
  }
  seats: seatPosInterface<any>[] = [
    {
      position: { x: 10, y: 10 },
      code: 'A1',
      clase: { name: 'Profesional', color: { r: 0, g: 0, b: 255 } },
      data: { name: 'Juan' },
    },
    {
      position: { x: 20, y: 10 },
      code: 'A2',
      clase: { name: 'Profesional', color: { r: 0, g: 0, b: 255 } },
      data: { name: 'Pedro' },
    },
  ];
  configLector!: configSeaLector<any>;

  title = 'seatEditorLibrary';
  config!: configSeatEditor;

  messageShow(message: notificationPlaneInterface) {
    console.log(message);
  }
  clickSeat(seat: seatPosInterface<any>) {
    alert(seat.data.name);
  }
  cancel() {
    alert('cancel');
  }

  save(data: finishSeatInterface<any>) {
    console.log(data);
  }
}
