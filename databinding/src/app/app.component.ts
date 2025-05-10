import { blue } from './../../../kitchen-shop/node_modules/@colors/colors/index.d';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{ type: 'server', name: 'testserver', content: 'this is a test' }];

  onIntervalFired(firedNumer: number) {
    console.log(firedNumer)
  }

  onServerAdded(serverData: { servername: string, serverContent: string }) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverContent,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    });
  }
}