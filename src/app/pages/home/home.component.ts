import { Component, OnInit } from '@angular/core';

interface DashboardItem {
    label: string;
    link: string;
    enabled: boolean;
}

@Component({
    selector: 'cm-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public dashboardItems: DashboardItem[] = [];

    constructor() { }

    ngOnInit() {
        this.dashboardItems = [
            { label: 'navigation.menu.exam-generator', link: '/exam-generator', enabled: true },
            { label: 'navigation.menu.class-layout', link: '/class-layout', enabled: true },
        ]
    }

}
