import { Component, LOCALE_ID, Inject } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

interface Language {
    code: string;
    label: string;
    icon: string;
}

@Component({
    selector: "cm-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    public currentLang: string;
    public languages: Language[] = [
        { code: 'en', label: 'navigation.language.english', icon: 'gb' },
        { code: 'es', label: 'navigation.language.spanish', icon: 'es' },
        { code: 'fr', label: 'navigation.language.french', icon: 'fr' }
    ];

    constructor(private readonly translate: TranslateService) {
        const navigatorLang = navigator.language.split('-')[0];
        const langCode = localStorage.getItem('user-lang') || navigatorLang;

        this.translate.setDefaultLang(langCode);
        this.currentLang = langCode;

    }

    public switchLanguage(langCode: string): void {
        this.translate.use(langCode);
        this.currentLang = langCode;
        localStorage.setItem('user-lang', langCode);
    }
}
