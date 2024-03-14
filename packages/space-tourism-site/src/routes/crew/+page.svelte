<script lang="ts">
	import Container from "$lib/Container.svelte";
    import douglas from "$lib/assets/crew/image-douglas-hurley.webp";
    import mark from "$lib/assets/crew/image-mark-shuttleworth.webp";
    import victor from "$lib/assets/crew/image-victor-glover.webp";
    import anousheh from "$lib/assets/crew/image-anousheh-ansari.webp";
    import data from '$lib/assets/crew/crew.json';

    let active = 0;

    const images = [
        douglas,
        mark,
        victor,
        anousheh,
    ]

</script>

<Container class="crew-bg-mobile md:crew-bg-tablet xl:crew-bg-desktop h-full">
    <main class="px-6 h-full flex flex-col md:grid grid-crew-md xl:grid-crew-lg">
        <div class="gird-header uppercase text-h-16 tracking-2.7 text-center font-barlow-condensed md:text-left md:text-h-20 md:tracking-3-38 md:pt-10 md:pl-5 xl:pl-32"> 
            <span class="opacity-25 -mr-0.5 font-bold">02</span> 
            Meet Your Crew
        </div>
        
        <div class="grid-photo flex flex-col justify-center items-center md:justify-end border-b border-white/10 md:border-none pt-10 xl:pt-36">
            <div class="relative h-56 w-full md:h-full bg-no-repeat bg-contain bg-bottom xl:w-11/12" style="background-image:url({images[active]});">
            
            </div>
        </div>
  
    
        <div class="grid-bio flex flex-col items-center mt-4 gap-6 md:flex-col-reverse md:justify-start xl:items-start">
            <ul class="flex gap-3 xl:pl-32  xl:mb-32 xl:mt-24 xl:gap-6">
                {#each [0,1,2,3] as index}
                    <li class="h-3 w-3 xl:h-4 xl:w-4 flex {active === index ? "bg-white" : "bg-white/15"} hover:bg-white/50 rounded-full cursor-pointer transition-colors">
                        <button aria-label="View {data[index].name}" on:click={()=>active=index} class="w-full h-full"></button>
                    </li>
                {/each}
            </ul>
    
            <div class="flex flex-col justify-center items-center gap-4 md:px-32 xl:justify-start xl:items-start xl:pr-0">
    
                <div class="flex flex-col items-center xl:items-start">
                    <span class="text-opacity-50 text-white uppercase text-h-16 md:text-h-24 xl:text-h-32 font-bellerfair">{data[active].role}</span>
                    <h1 class="font-serif uppercase text-h-24 md:text-h-40 xl:text-h-56">{data[active].name}</h1>
                </div>
    
                <p class="text-center text-light-purple text-h-15 leading-25 md:text-h-16 md:leading-28 font-barlow xl:text-h-18 xl:leading-32 xl:text-left xl:pr-32">{data[active].bio}</p>
    
            </div>
        </div>
    </main>
</Container>

