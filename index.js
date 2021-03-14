import React from 'react';
import { nanoid } from 'nanoid';
import ReactDOM from 'react-dom';

let __stylizerComponentRegistry = [];
let __stylizerGlobalRegistry = [];

export function parseComponentToStyle({ component, toClassName, shouldUnmount = true }) {
    let parsedRules = '';

    const styledRootId = `extract-emotion-styles-root-${nanoid(7)}`;
    const styledElementId = `extract-emotion-styles-${nanoid(7)}`;

    const styledRoot = document.createElement('div');
    styledRoot.setAttribute('id', styledRootId);
    document.body.appendChild(styledRoot);

    ReactDOM.render(
        <div style={{ display: 'none' }}>
            {React.cloneElement(component, { id: styledElementId })}
        </div>,
        document.getElementById(styledRootId)
    );

    // We need to grab prototype methods themselves so that we can work on the static version of css selectors/query selectors.
    const { filter } = Array.prototype;

    const refClasses = document
        .getElementById(styledElementId)
        .className.split(' ')

    refClasses.forEach((className) => {

        // Add a dot so we can search the raw CSS selectorText.
        const refClassName = `.${refClasses[0]}`;

        const findSelectors = document.querySelectorAll('[data-emotion]');
        const filteredRules = filter.call(findSelectors, (node) => node.innerText.includes(refClasses[0]));

        if (toClassName) {
            filteredRules.forEach((ruleSet) => {
                parsedRules += `${ruleSet.innerText.replaceAll(refClassName, toClassName)} `;
            });
        } else {
            filteredRules.forEach((ruleSet) => {
                parsedRules += `${ruleSet.innerText} `;
            });
        }
    })

    if (shouldUnmount) {
        ReactDOM.unmountComponentAtNode(document.getElementById(styledRootId))
        document.body.removeChild(document.getElementById(styledRootId));
    }

    return parsedRules;
}

function reRender() {
    if (document.querySelectorAll('style[data-extractor-stylizer]').length === 0) {
        const stylesRoot = document.createElement('style');
        stylesRoot.setAttribute('data-extractor-stylizer', 'true');
        document.head.appendChild(stylesRoot);
    }

    let sheet = '';

    __stylizerComponentRegistry.forEach((styleSet) => {
        sheet += `${styleSet.styles} `;
    });

    __stylizerGlobalRegistry.forEach((textStyle) => {
        sheet += `${textStyle} `;
    });

    ReactDOM.render(<>{sheet}</>, document.querySelectorAll('style[data-extractor-stylizer]')[0]);
}

export function applyComponentStylesToClass({ component, toClassName, shouldUnmount }) {
    if (__stylizerComponentRegistry.find((x) => x.toClassName === toClassName)) {
        return;
    }

    const styles = parseComponentToStyle({ component, toClassName, shouldUnmount });
    __stylizerComponentRegistry.push({ toClassName, styles });

    reRender();
}

export function addRawCssToGlobalStyles(rawCSS) {
    __stylizerGlobalRegistry.push(rawCSS.replace(/ {2}|\r\n|\n|\r/gm, ' '));

    reRender();
}
