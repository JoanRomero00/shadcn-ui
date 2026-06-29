import { SiteHeader } from "@/components/layout/site-header"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata = {
  title: "Configuración - Poder Judicial",
  description: "Ajustes de cuenta, perfil, notificaciones y seguridad.",
}

export default function SettingsPage() {
  return (
    <>
      <SiteHeader title="Configuración" />
      <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 max-w-4xl w-full mx-auto">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight">Configuración del Sistema</h2>
          <p className="text-muted-foreground">
            Personaliza tu perfil, gestiona la seguridad de tu cuenta y configura tus preferencias de notificaciones.
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-muted/60 rounded-lg p-1">
            <TabsTrigger value="profile" className="rounded-md text-xs font-semibold py-1.5 cursor-pointer">
              Perfil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-md text-xs font-semibold py-1.5 cursor-pointer">
              Notificaciones
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-md text-xs font-semibold py-1.5 cursor-pointer">
              Seguridad
            </TabsTrigger>
            <TabsTrigger value="general" className="rounded-md text-xs font-semibold py-1.5 cursor-pointer">
              Sistema
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">Información de Cuenta</CardTitle>
                <CardDescription>Edita la información pública y de contacto de tu cuenta judicial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input id="name" defaultValue="Romero Joan" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input id="email" type="email" defaultValue="jromero@santafe.gov.ar" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="role">Rol asignado</Label>
                    <Input id="role" defaultValue="Operador Judicial / Administrador" disabled className="bg-muted/40 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="department">Organismo / Oficina</Label>
                    <Input id="department" defaultValue="Cámara de Apelación Civil y Comercial" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end p-4 border-t">
                <button className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer">
                  Guardar Cambios
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">Preferencias de Alertas</CardTitle>
                <CardDescription>Elige qué notificaciones deseas recibir y dónde.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5 max-w-[80%]">
                      <label className="text-xs font-semibold">Notificaciones de Integraciones</label>
                      <p className="text-[11px] text-muted-foreground">Recibe alertas sobre nuevas integraciones de sala pendientes de tu aprobación.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 text-primary rounded border-input cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5 max-w-[80%]">
                      <label className="text-xs font-semibold">Actualizaciones de Expedientes</label>
                      <p className="text-[11px] text-muted-foreground">Notificaciones cuando ocurra un movimiento o sorteo en los expedientes de tu cámara.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 text-primary rounded border-input cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5 max-w-[80%]">
                      <label className="text-xs font-semibold">Alertas de Licencias</label>
                      <p className="text-[11px] text-muted-foreground">Recibe avisos sobre licencias extraordinarias cargadas por vocales de tu jurisdicción.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="size-4 text-primary rounded border-input cursor-pointer" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end p-4 border-t">
                <button className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer">
                  Guardar Preferencias
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">Cambiar Contraseña</CardTitle>
                <CardDescription>Actualiza tu contraseña para asegurar tu acceso judicial.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-w-md">
                  <div className="space-y-1">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end p-4 border-t">
                <button className="bg-primary hover:bg-primary/95 text-primary-foreground font-semibold px-4 py-2 rounded-lg text-xs transition-colors cursor-pointer">
                  Actualizar Contraseña
                </button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* System/General Tab */}
          <TabsContent value="general" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-bold">Preferencias del Sistema</CardTitle>
                <CardDescription>Ajustes generales del panel de administración.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5">
                      <label className="text-xs font-semibold">Idioma Preferido</label>
                      <p className="text-[11px] text-muted-foreground">Idioma de la interfaz de usuario.</p>
                    </div>
                    <select className="bg-card border border-input rounded-md px-2 py-1 text-xs outline-none cursor-pointer">
                      <option value="es">Español (ES)</option>
                      <option value="en">English (US)</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="space-y-0.5">
                      <label className="text-xs font-semibold">Tema de Interfaz</label>
                      <p className="text-[11px] text-muted-foreground">Alternar el tema visual entre claro y oscuro.</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground bg-muted py-0.5 px-2 rounded-md font-medium">Auto (Sistema)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
