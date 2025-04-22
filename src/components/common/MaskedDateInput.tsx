import React from 'react';
import { useMaskito } from '@maskito/react';
import { maskitoDateOptionsGenerator } from '@maskito/kit';
import { Input } from '@/components/ui/input';

interface MaskedDateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const MaskedDateInput = React.forwardRef<HTMLInputElement, MaskedDateInputProps>((props, ref) => {
  const options = maskitoDateOptionsGenerator({
    mode: 'dd/mm/yyyy',
    separator: '/'
  });
  
  const maskitoRef = useMaskito({ options });

  return (
    <Input
      {...props}
      ref={(node) => {
        maskitoRef(node);
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
        }
      }}
      placeholder="jj/mm/aaaa"
    />
  );
});

export default MaskedDateInput;
