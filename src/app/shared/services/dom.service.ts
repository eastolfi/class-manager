import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Packer } from 'docx';

@Injectable({
    providedIn: 'root'
})
export class DomService {
    private readonly plainAttributes = [
        'for',
        'inputmode',
        'minlength',
        'maxlength',
        'min',
        'max',
        'pattern',
    ];

    constructor(private readonly sanitizer: DomSanitizer) { }

    public downloadWordFile(documentName, doc) {
        return new Promise((resolve, reject) => {
            Packer.toBuffer(doc).then(buffer => {
                const blob = new Blob([buffer], { type: 'application/octet-stream' });

                this.downloadBlob(blob, `./${documentName}`)
            })
        });
    }

    private downloadBlob(blob, fileName) {
        const link = this.createElement('a') as HTMLAnchorElement;
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));

        link.href = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, url);
        link.download = fileName;

        document.body.appendChild(link);

        link.click();
    }

    private createElement(tag: string, attrs?): HTMLElement {
        const el = document.createElement(tag);
        this.plainAttributes.forEach(plainAttr => {
            if (attrs && plainAttr in attrs && attrs[plainAttr]) {
                el.setAttribute(plainAttr, attrs[plainAttr]);
            }
            if (attrs) {
                delete attrs[plainAttr];
            }
        });

        Object.assign(el, attrs);

        return el;
    }
}
