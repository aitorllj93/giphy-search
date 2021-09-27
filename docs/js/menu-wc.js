'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">giphy-search documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-94f12a77d075d53856406d1a8c870d74"' : 'data-target="#xs-components-links-module-AppModule-94f12a77d075d53856406d1a8c870d74"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-94f12a77d075d53856406d1a8c870d74"' :
                                            'id="xs-components-links-module-AppModule-94f12a77d075d53856406d1a8c870d74"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutModule-85218b16dcdd53ecf4ec8b6f68eeabe0"' : 'data-target="#xs-components-links-module-LayoutModule-85218b16dcdd53ecf4ec8b6f68eeabe0"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-85218b16dcdd53ecf4ec8b6f68eeabe0"' :
                                            'id="xs-components-links-module-LayoutModule-85218b16dcdd53ecf4ec8b6f68eeabe0"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchGiphyImagesModule.html" data-type="entity-link" >SearchGiphyImagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SearchGiphyImagesModule-6d94e6b5264456e27b6c7ac33bff53d3"' : 'data-target="#xs-components-links-module-SearchGiphyImagesModule-6d94e6b5264456e27b6c7ac33bff53d3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SearchGiphyImagesModule-6d94e6b5264456e27b6c7ac33bff53d3"' :
                                            'id="xs-components-links-module-SearchGiphyImagesModule-6d94e6b5264456e27b6c7ac33bff53d3"' }>
                                            <li class="link">
                                                <a href="components/GiphyImagesGridComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GiphyImagesGridComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GiphyImagesGridPaginationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GiphyImagesGridPaginationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GiphyImagesSearchbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GiphyImagesSearchbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchGiphyImagesPage.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchGiphyImagesPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SearchGiphyImagesRoutingModule.html" data-type="entity-link" >SearchGiphyImagesRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/PaginationNextButtonClicked.html" data-type="entity-link" >PaginationNextButtonClicked</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationPreviousButtonClicked.html" data-type="entity-link" >PaginationPreviousButtonClicked</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchFailed.html" data-type="entity-link" >SearchFailed</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchSubmitted.html" data-type="entity-link" >SearchSubmitted</a>
                            </li>
                            <li class="link">
                                <a href="classes/SearchSucceeded.html" data-type="entity-link" >SearchSucceeded</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/SearchGiphyImagesService.html" data-type="entity-link" >SearchGiphyImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SearchGiphyImagesState.html" data-type="entity-link" >SearchGiphyImagesState</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Environment.html" data-type="entity-link" >Environment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GiphyImagesSearchbarFormModel.html" data-type="entity-link" >GiphyImagesSearchbarFormModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/GiphyImagesSearchbarModel.html" data-type="entity-link" >GiphyImagesSearchbarModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchGiphyImagesStateModel.html" data-type="entity-link" >SearchGiphyImagesStateModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchGiphyImagesStateModelSearchParams.html" data-type="entity-link" >SearchGiphyImagesStateModelSearchParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SearchGiphyImagesStateModelSearchResult.html" data-type="entity-link" >SearchGiphyImagesStateModelSearchResult</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});