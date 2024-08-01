import { Injectable, inject } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Injectable({
    providedIn: 'root'
})
export class FunctionsService {
    private functions = inject(Functions);

    sayHello = (name: string) => {
        return httpsCallable<string, void>(this.functions, 'sayHello')(name);
    }
}
