import { Box, Typography } from '@mui/material'
import Editor from "react-simple-code-editor";
import beautify from "js-beautify";
import Prism from "prismjs";
import "prismjs/components/prism-markup"; // for HTML highlighting
import "prismjs/themes/prism.css"; // you can choose other themes
import { useState } from 'react';

type metaProp = {
    meta: string
}

export const MetaTab = ({ meta }: metaProp) => {

    const formattedHTML = beautify.html(meta, {
        indent_size: 2,
        wrap_line_length: 80,
        preserve_newlines: true,
        max_preserve_newlines: 1,
    });

    const [code, setCode] = useState(formattedHTML);


    const highlightCode = (code: string) => {
        return Prism.highlight(code, Prism.languages.markup, "markup");
    };

    return (
        <Box mt={2}>
            <Editor
                value={code}
                onValueChange={setCode}
                highlight={highlightCode}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 14,
                    borderRadius: 6,
                    border: "1px solid #ddd",
                }}
                readOnly={true} // set readOnly if you want viewer only
            />
        </Box>

    )
}
