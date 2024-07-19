import { Observable } from "rxjs";

export interface BottomSheetComponent {
    submitted$: Observable<void>;
}