<script lang="ts">

    import Container from "$lib/Container.svelte";
    import data from '$lib/assets/destination/destinations.json';
    import moon from '$lib/assets/destination/image-moon.webp';
    import mars from "$lib/assets/destination/image-mars.webp";
    import titan from "$lib/assets/destination/image-titan.webp";
    import europa from "$lib/assets/destination/image-europa.webp";

    const images = [
        moon,
        mars,
        titan,
        europa
    ]

    let active = 0
</script>

<Container class="destination-bg-mobile md:destination-bg-tablet xl:destination-bg-desktop h-full">
    <main class="px-6 h-full flex flex-col xl:flex-row">
        <div class="flex flex-col xl:w-2/4 xl:mt-12 xl:pl-32">
            <div class="font-barlow-condensed uppercase text-h-16 tracking-2.7 text-center md:text-left md:py-8 md:text-h-20 md:tracking-3-38 xl:text-h-28 xl:tracking-4-72"> 
                <span class="opacity-25 mr-1 md:mr-0.5 font-bold">01</span> 
                Pick Your DESTINATION
            </div>
        
            <div class="flex justify-center items-center mt-8 md:mt-2">
                <div class="h-44 w-44 md:h-[18.75rem] md:w-[18.75rem] xl:h-[27.8125rem] xl:w-[27.8125rem]">
                    <img class="h-full w-full object-contain" src={images[active]} alt={data[active].name}/>
                </div>
            </div>
        </div>
    
        <div class="flex flex-col xl:justify-center xl:w-2/4">
            <ul class="flex gap-8 justify-center mt-6 xl:justify-start xl:px-20">
                {#each data as { name }, i}
                    <li class="border-b-2 {data[active].name === name ? "border-white": "border-transparent"} pb-1.5 hover:border-white hover:border-opacity-50 transition-colors">
                        <button aria-label="View {name}" on:click={()=>active = i} class="uppercase font-barlow-condensed text-h-14 tracking-3-38 md:text-h-16 md:tracking-2.7 {data[active].name === name ? "text-white":"text-light-purple"}">{name}</button>
                    </li>
                {/each}
            </ul>
        
            <div class="flex flex-col space-y-8 mt-2 md:space-y-12 md:px-20 md:mt-6">
               <div class="flex flex-col text-center xl:text-left">
                    <h1 class="uppercase font-bellerfair tracking-none text-h-56 md:text-h-80 -mb-2 xl:text-h-100">{data[active].name}</h1>
                    <p class="font-barlow text-light-purple text-h-15 leading-25 tracking-none md:text-h-16 md:leading-28 xl:text-h-18 xl:leading-32">{data[active].description}</p>
               </div>
            
                <hr class="opacity-30 w-full xl:border"/>
    
                <div class="space-y-8 flex flex-col md:flex-row md:space-y-0 md:items-center w-full md:justify-evenly xl:justify-start xl:gap-32 xl:text-left">
                    <div class="flex flex-col gap-2 items-center xl:items-start">
                        <span class="text-light-purple text-h-14 tracking-3-38">AVG. DISTANCE</span>
                        <h2 class="uppercase font-bellerfair text-h-28 tracking-none">{data[active].distance}</h2>
                    </div>
                
                    <div class="flex flex-col gap-2 items-center xl:items-start">
                        <span class="text-light-purple text-h-14 tracking-3-38">EST. TRAVEL TIME</span>
                        <h2 class="uppercase text-sub1 font-serif">{data[active].travel}</h2>
                    </div>
                </div>
            </div>
        </div>
    </main>
</Container>