<script>
    import Container from "$lib/Container.svelte";
</script>

<Container class="home-bg-mobile md:home-bg-table xl:home-bg-desktop h-full">
   <main class="px-6 py-5 md:py-10 h-full flex flex-col md:justify-center md:items-center lg:flex-row lg:w-full lg:justify-between lg:px-36">

        <div class="flex flex-col justify-center md:w-min md:mt-20 space-y-4 md:space-y-6 xl:justify-start">
            <div class="font-barlow-condensed text-h-16 tracking-2.7 md:text-h-20 md:tracking-3-38 xl:text-h-28 xl:tracking-4-72 text-light-purple uppercase text-center xl:text-left">So, you want to travel to</div>
            <h1 class="uppercase font-serif text-center text-h-80 tracking-none leading-100 md:leading-150 md:text-h-150 -my-4">SPACE</h1>
        
        
            <p class="font-barlow text-light-purple text-h-15 leading-25 tracking-none md:text-h-16 md:leading-28 xl:text-h-18 xl:leading-32 text-center xl:text-left">
                Let's face it; if you want to go to space, you might as well genuinely go to 
                outer space and not hover kind of on the edge of it. Well sit back, and relax 
                    because we'll give you a truly out of this world experience!
            </p>
        </div>
        

        <div class="flex justify-center group relative mt-auto mb-8 xl:mb-32">
            <div class="h-[9.375rem] w-[9.375rem] md:h-[15.125rem] md:w-[15.125rem] xl:w-[17.125rem] xl:h-[17.125rem] rounded-full bg-white flex justify-center items-center text-black z-10">
                <span class="text-h4-mobile md:text-h4 font-serif uppercase">Explore</span>
            </div>
            <div class="group-hover:scale-150 h-[9.375rem] w-[9.375rem] md:h-[15.125rem] md:w-[15.125rem] xl:w-[17.125rem] xl:h-[17.125rem] rounded-full bg-navy-blue/80 absolute transition-transform"></div>
        </div>
    </main>
</Container>







