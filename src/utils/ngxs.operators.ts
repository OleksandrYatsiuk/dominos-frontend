import {
    distinctUntilChanged, map, Observable, OperatorFunction, shareReplay, startWith,
} from 'rxjs';
import {
    ActionContext, ActionStatus, ActionType, getActionTypeFromInstance, createSelectMap, SelectorMap, createDispatchMap, ActionMap
} from '@ngxs/store';
import { signalStoreFeature, withComputed, withMethods } from '@ngrx/signals';

export function ofActionInProcess<T extends ActionType>(type: T, compareArgumentsFn?: (type: ActionContext['action']) => boolean)
    : OperatorFunction<ActionContext, boolean> {
    return (source: Observable<ActionContext>) => source
        .pipe(
            map((ctx) => {
                const currentActionType = getActionTypeFromInstance(ctx.action);

                const allowedType = getActionTypeFromInstance(type);

                if (allowedType === currentActionType) {
                    const isSameArguments = compareArgumentsFn ? compareArgumentsFn(ctx.action) : true;
                    const startedActionStatus = [ActionStatus.Dispatched];
                    return startedActionStatus.includes(ctx.status) && isSameArguments;
                }
                return false;
            }),
            startWith(false),
            distinctUntilChanged(),
            shareReplay(1),
        );
}
export function withSelectors<T extends SelectorMap>(selectorMap: T) {
    return signalStoreFeature(withComputed(() => createSelectMap(selectorMap)));
}

export function withActions<T extends ActionMap>(actionMap: T) {
    return signalStoreFeature(withMethods(() => createDispatchMap(actionMap)));
}
