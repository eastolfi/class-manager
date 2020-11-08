import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Packer } from 'docx';
import { Observable, Observer } from 'rxjs';

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

    public downloadBlob(blob, fileName) {
        const link = this.createElement('a') as HTMLAnchorElement;
        const url = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));

        link.href = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, url);
        link.download = fileName;

        document.body.appendChild(link);

        link.click();
    }

    public uploadFile(): Observable<string> {
        return new Observable((observer: Observer<string>) => {
            const uploader: HTMLInputElement = document.createElement('input');
            uploader.hidden = true;
            uploader.type = 'file';
            uploader.onchange = (event) => {
                const files = (event.target as HTMLInputElement).files;

                var fileReader = new FileReader();
                fileReader.onload = (fileLoadedEvent: ProgressEvent) => {
                    observer.next((fileLoadedEvent.target as FileReader).result.toString());
                    observer.complete();
                };

                fileReader.readAsText(files[0], "UTF-8");
            }

            window.document.body.append(uploader);

            uploader.click();
        })
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
