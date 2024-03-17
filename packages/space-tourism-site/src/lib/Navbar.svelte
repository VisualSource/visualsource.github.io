<script lang="ts">
    import { base } from "$app/paths";
    import {page} from '$app/stores';
    import {normalize} from './utils';

    let show = false;

    const content = [
        { path: normalize(`${base}/`), name: "home" },
        { path: normalize(`${base}/destination`), name: "destination", },
        { path: normalize(`${base}/crew`), name: "crew", },
        { path: normalize(`${base}/technology`), name: "technology"}
    ];

    let currentRoute = $page.url.pathname;

</script>

<nav class="flex justify-between items-center px-6 pt-6 pb-4 md:p-0 xl:pt-10">
    <div class="h-10 w-10 md:h-12 md:w-12 relative md:ml-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
            <g fill="none" fill-rule="evenodd"><circle cx="24" cy="24" r="24" fill="#FFF"/>
                <path fill="#0B0D17" d="M24 0c0 16-8 24-24 24 15.718.114 23.718 8.114 24 24 0-16 8-24 24-24-16 0-24-8-24-24z"/>
            </g>
        </svg>
    </div>

    {#if show}
        <div class="absolute top-0 left-0 w-full h-full flex z-50">
            <div aria-hidden="true" on:click={()=>show = false} class="w-1/3 h-full"></div>
            <div class="flex flex-col w-2/3 h-full bg-white bg-opacity-15 backdrop-blur-2xl animate-in slide-in-from-right-20">
                <div class="p-6 flex justify-end">
                    <button aria-label="Close side navigation" class="h-10 w-10 flex justify-center items-center" on:click={()=>show = false}>
                        <svg class="text-light-purple" xmlns="http://www.w3.org/2000/svg" width="24" height="21">
                            <g fill="currentColor" fill-rule="evenodd">
                                <path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z"/>
                                <path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z"/>
                            </g>
                        </svg>
                    </button>
                </div>
                <ul class="px-8 space-y-8">
                    {#each content as { name, path },i}
                        <li>
                            <a tabindex="0" class="text-nav group" href={path}><span class="font-bold mr-2">0{i}</span> <span class="group-hover:text-white/80 uppercase">{name}</span></a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
       
    {/if}
    <div class="hidden md:flex bg-white bg-opacity-5 backdrop-blur-xl w-2/3 h-24 xl:w-7/12 relative">
        <div class="hidden xl:block h-1 border-b border-white/15 w-3/6 absolute top-1/2 -left-[46%]"></div>
        <ul class="flex justify-evenly items-center w-full xl:justify-start xl:gap-12 xl:pl-36">
            {#each content as { path, name }, i }
                <li class="h-full">
                    <a class="text-nav uppercase h-full flex gap-3 items-center justify-center border-b-2 {currentRoute === path ? "border-white" : "border-transparent"} hover:border-white/50" href={path}>
                        <span class="hidden lg:inline text-nav font-bold">0{i}</span>
                        {name}
                    </a>
                </li>
            {/each}
        </ul>
    </div>

    <button class="md:hidden" on:click={()=>show = true} aria-label="Open side navigation">
            <svg class="text-light-purple h-full w-full" xmlns="http://www.w3.org/2000/svg" width="24" height="21">
                <g fill="currentColor" fill-rule="evenodd"><path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z"/>
                </g>
            </svg>
    </button>

</nav>