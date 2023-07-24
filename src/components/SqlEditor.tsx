import React, { useState, useEffect, useRef, useMemo } from 'react';

type SQLCodeBlockProps = {
  sqlCode: string;
  children: React.ReactNode
  // onChange: (sqlCode: string) => void;
}

// let timeout;

function SQLCodeBlock({ sqlCode, children }: SQLCodeBlockProps) {
  const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'INSERT', 'UPDATE', 'DELETE'];

  //highight keywords
  const highlighted = (code: string, ifTextArea: boolean) => {
    const regex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
    return code.replace(regex, (match) => {
        let text = match
        return ifTextArea? `${text}` :`<span class="text-[#6537E4]">${text}</span>`
    });
  };

  const [editableCode, setEditableCode] = useState(sqlCode);
  //const [numberOfLines, setNumberOfLines] = useState(0)
  const hiddenTextareaRef = useRef<HTMLTextAreaElement | null>(null); 

  const data = useMemo(() => {
    var lines = editableCode.split(/\r|\r\n|\n/);
    var count = lines.length;
    // console.log(count); // Outputs 4
    return count
  }, [editableCode])

  useEffect(() => {
    setEditableCode(sqlCode)
  }, [sqlCode]);

  function handleHiddenTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    // console.log('here');
    setEditableCode(highlighted(e.target.value, true));
    // onChange(highlighted(e.target.value, true));
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      target.value = target.value.substring(0, start) + '  ' + target.value.substring(end);
      target.selectionStart = target.selectionEnd = start + 2;

      setEditableCode(target.value)
    }
    // Handle Undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        document.execCommand('undo', false);
      }
  
      // Handle Redo (Ctrl/Cmd + Shift + Z)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z') {
        e.preventDefault();
        document.execCommand('redo', false);
      }
  };

  function handleWrapClick() {
    const hiddenTextarea = hiddenTextareaRef.current;
    if (hiddenTextarea) {
        hiddenTextarea.focus();
        const selectionStart = hiddenTextarea.selectionStart;
        const selectionEnd = hiddenTextarea.selectionEnd;
        hiddenTextarea.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  return (
    <>
        <div className="code-container flex">
            <div key={editableCode} className="line-count bg-white pr-8 py-9 pl-14">
                {
                    React.Children.toArray(
                        [...new Array(data ?? 1)].map((_, index) => (
                            <div>{index + 1}</div>
                        ))
                    )
                }
            </div>
            <div className='relative flex flex-1'
                onClick={handleWrapClick}
            >
                <pre
                    className="rounded-lg text-black cursor-pointer flex-1 flex absolute left-0 top-0 w-full h-full bg-white py-9 pr-14"
                    style={{
                        zIndex: -1
                    }}
                >
                    <code
                        style={{ outline: 'none' }}
                        className="w-full"
                        dangerouslySetInnerHTML={{ __html: highlighted(editableCode, false) }}
                    />
                </pre>
                <textarea
                    ref={hiddenTextareaRef}
                    value={editableCode}
                    onInput={handleHiddenTextareaChange}
                    onKeyDown={handleKeyDown}
                    id="hidden-code-editor"
                    className="w-full h-full bg-transparent text-transparent caret-black focus-visible:outline-none py-9 pr-14"
                ></textarea>
            </div>
        </div>
        <div className='p-8 flex justify-end bg-white'>
          {children}
        </div>
    </>
  );
};

export default SQLCodeBlock;
