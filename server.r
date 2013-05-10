library(shiny)
library(knitr)

shinyServer(function(input, output) {
  
  output$output <- renderText({

    figdir = tempdir(); on.exit(unlink(figdir))
    opts_knit$set(progress = FALSE, fig.path = figdir)
    on.exit(unlink('figure/', recursive = TRUE)) # do not need the figure dir
    
    #code mostly from rNotebook
    src = input$editor_text
    
    #manually parse --- and replace with article
    #temporary until slidify working as needed
    src.split <- unlist( strsplit(src,"(---)|(<article*>)") )
    
    src.new <- "<article>"  #start with article 

    for (i in 1:length(src.split)) {
      if (!(src.split[i] == "")) {
        src.new <- paste(
          src.new,
          try(
            knit2html(
              text = src.split[i],
              fragment.only = TRUE)
            ),
          ifelse(i==length(src.split),"</article>","</article>\n<article>"),
          sep = "\n"
        )
      }
    }      

    return(
      paste(
        "<section class='slides'>",
        src.new,
        "</section>",
        sep = '\n'
      )
    )
  })
})
