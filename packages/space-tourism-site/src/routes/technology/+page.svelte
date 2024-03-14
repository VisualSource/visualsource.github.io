<script>
	import Container from "$lib/Container.svelte";
    import data from "$lib/assets/technology/technology.json";
    import lauch from "$lib/assets/technology/image-launch-vehicle-landscape.jpg"
    import capsule from "$lib/assets/technology/image-space-capsule-landscape.jpg";
    import spaceport from "$lib/assets/technology/image-spaceport-landscape.jpg";
    import p_lauch from "$lib/assets/technology/image-launch-vehicle-portrait.jpg"
    import p_capsule from "$lib/assets/technology/image-space-capsule-portrait.jpg";
    import p_spaceport from "$lib/assets/technology/image-spaceport-portrait.jpg";

    const landscape_images = [lauch,spaceport,capsule];
    const portrait_images=[p_lauch,p_spaceport,p_capsule];


    let active = 0;
</script>

<Container class="tech-bg-mobile md:tech-bg-tablet lg:tech-bg-desktop h-full">
    <main class="space-y-8 h-full flex flex-col lg:grid grid-tech-lg lg:space-y-0">
        <div class="uppercase text-h-16 tracking-2.7 text-center md:text-h-20 md:tracking-3-38 md:text-left md:px-10 md:pt-10 md:pb-6 gird-header lg:px-20"> 
            <span class="opacity-25 -mr-0.5 font-bold">03</span> 
            Space Launch 101
        </div>
    
        <div class="grid-photo lg:ml-auto lg:my-auto flex flex-col justify-center">
            <img class="lg:hidden" src={landscape_images[active]} alt={data[active].name}/>
            <img class="hidden lg:block" src={portrait_images[active]} alt={data[active].name}/>
        </div>

        <div class="flex flex-col h-full space-y-6 md:space-y-8 grid-bio lg:flex-row lg:pl-20 lg:pr-24 lg:space-y-0 lg:gap-10">
            <ul class="flex gap-3 justify-center md:gap-6 md:py-8 lg:flex-col lg:py-0 lg:justify-start">
                {#each [0,1,2] as index}
                    <li class="h-10 w-10 md:h-16 md:w-16 lg:h-20 lg:w-20 flex rounded-full border : {active===index?"bg-white text-black":"border-white/15"} hover:border-white transition-colors">
                        <button aria-label="View {data[index].name}" on:click={()=>active=index} class="h-full w-full">{index + 1}</button>
                    </li>
                {/each}
            </ul>
        
            <div class="flex flex-col justify-center items-center gap-6 px-6 md:gap-4 lg:justify-start lg:items-start">
        
                <div class="flex flex-col items-center gap-2 lg:items-start">
                    <span class="text-light-purple uppercase font-barlow-condensed text-h-14 tracking-3-38 md:text-h-16 md:tracking-2.7">The Terminology...</span>
                    <h3 class="font-bellerfair uppercase text-h-24 md:text-h-40 xl:text-h-56">{data[active].name}</h3>
                </div>
        
                <p class="text-center text-light-purple font-barlow text-h-15 leading-25 md:text-h-16 md:leading-28 md:px-36 lg:px-0 lg:text-left xl:text-h-18">{data[active].description}</p>
        
            </div>
        </div>
    </main>
  
</Container>