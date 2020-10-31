import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { Subscription } from 'rxjs';
import { AlertService } from '../components/alert';

@Injectable({
    providedIn: 'root'
})
export class ServiceWorkerService implements OnInit, OnDestroy {
    private subscription: Subscription;

    constructor(private readonly updates: SwUpdate, private readonly alertService: AlertService) { }

    ngOnInit(): void {
        this.checkForUpdates();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    public checkForUpdates(): void {
        this.subscription = this.updates.available.subscribe((event: UpdateAvailableEvent) => {
            this.notifyNewVersion();
        });
    }

    private notifyNewVersion(): void {
        this.alertService.showSuccess('asdasdasd', {
            label: 'Reload',
            fn: () => {
                this.updates.activateUpdate().then(() => window.location.reload());
            }
        });
    }
}
