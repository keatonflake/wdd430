import { Component } from '@angular/core';

@Component({
    selector: 'app-server',
    standalone: false,
    templateUrl: './server.component.html',
})
export class ServerComponent {
    serverId = 100
    serverName = "test"

    getServerName() {
        return this.serverName
    }
}