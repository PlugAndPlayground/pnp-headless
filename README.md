# TO USE THIS YOU WILL NEED THE SOURCE CODE OF PPNP

# pnp-headless
This is a tool for running PNP graphs in "headless" mode without any UI, useful for graph that are built to have side-effects in other applications, where PNP is not the end consumer, but a transformer of data to be sent or used somewhere else.

Related repositories:
PNP (the beast): https://github.com/fakob/plug-and-play
PNP Companion (optional backend): https://github.com/magnificus/pnp-companion-2

HOW TO USE

* Download the binary executable (should be here somewhere) or run it yourself.
* In the same folder as the executable, create a folder called "graphs", put 1 or more PNP graphs
* In the same folder as the executable, create a folder "pnp" with the contents of a compiled PNP "dist" folder.
* Execute the executable
* Now you should be headlessly running the graphs in the graphs folder via the PNP version that is in the "pnp" folder.
