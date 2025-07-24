import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileUpload } from '@/components/FileUpload';
import { Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PfxGeneratorForm {
  dns: string;
  newCrt: File | null;
}

const PfxGenerator: React.FC = () => {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PfxGeneratorForm>({
    defaultValues: { newCrt: null }
  });

  const newCrt = watch('newCrt');

  const onSubmit = (data: PfxGeneratorForm) => {
    console.log('PFX Generator Request:', data);
    toast({
      title: "PFX generation submitted",
      description: `PFX generation request for ${data.dns} has been submitted successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="h-8 w-8" />
          PFX Generator
        </h1>
        <p className="text-muted-foreground">Generate a PFX file from your certificate</p>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>PFX Generation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="dns">DNS *</Label>
              <Input {...register('dns', { required: 'DNS is required' })} />
              {errors.dns && <p className="text-sm text-destructive">{errors.dns.message}</p>}
            </div>

            <div>
              <Label>New .crt File *</Label>
              <FileUpload
                accept=".crt"
                value={newCrt}
                onChange={(file) => setValue('newCrt', file as File | null)}
                placeholder="Upload new .crt file"
                required
              />
              {!newCrt && <p className="text-sm text-destructive">New .crt file is required</p>}
            </div>

            <Button type="submit" className="bg-gradient-primary hover:bg-primary-glow">
              Generate PFX
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PfxGenerator;