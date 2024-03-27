<h1>Proyecto Final de Backend: API Ecommerce</h1>

<p>Este proyecto presenta una API para una plataforma de comercio electrónico, proporcionando funcionalidades como gestión de usuarios, productos y carritos de compra.</p>

<h2>Instalación</h2>

<ol>
  <li>Clona este repositorio utilizando el siguiente comando:</li>
  <code>git clone https://github.com/IanRios22/PF_API_Ecommerce.git</code>
  <li>Instala todas las dependencias del proyecto ejecutando:</li>
  <code>npm install</code>
</ol>

<h2>Uso</h2>

<h3>Endpoints Disponibles</h3>

<h4>Usuarios</h4>

<ul>
  <li><strong>POST /api/users/register:</strong> Permite registrar un nuevo usuario.</li>
  <li><strong>POST /api/users/login:</strong> Inicia sesión de un usuario existente.</li>
  <li><strong>GET /api/users/profile-cookie:</strong> Obtiene el perfil del usuario actual.</li>
  <li><strong>GET /api/users/all:</strong> Obtiene todos los usuarios. Solo accesible para usuarios con rol de administrador.</li>
  <li><strong>DELETE /api/users/delete:</strong> Elimina usuarios inactivos. Solo accesible para usuarios con rol de "admin".</li>
  <li><strong>POST /api/users/profile-img:</strong> Carga una imagen de perfil para el usuario. La carga de la imagen actualiza automáticamente el rol del usuario a "premium".</li>
</ul>

<h4>Productos</h4>

<ul>
  <li><strong>GET /api/products/:</strong> Obtiene todos los productos.</li>
  <li><strong>POST /api/products/:</strong> Crea un nuevo producto. Solo accesible para usuarios con rol "premium".</li>
  <li><strong>GET /api/products/{id}:</strong> Obtiene un producto por su ID.</li>
  <li><strong>DELETE /api/products/{id}:</strong> Elimina un producto por su ID. Accesible para administradores y usuarios "premium" únicamente.</li>
</ul>

<h4>Carrito</h4>

<ul>
  <li><strong>POST /api/carts/:</strong> Crea un nuevo carrito. Solo accesible para usuarios registrados.</li>
  <li><strong>GET /api/carts/{id}:</strong> Obtiene un carrito por su ID.</li>
  <li><strong>PUT /api/carts/{idCart}/products/{idProd}:</strong> Agrega un producto al carrito.</li>
  <li><strong>DELETE /api/carts/{idCart}/products/{idProd}:</strong> Elimina un producto del carrito.</li>
  <li><strong>DELETE /api/tickets/{cartId}:</strong> Vacía el carrito.</li>
</ul>

<h3>Configuración y Consideraciones</h3>

<p>Se recomienda revisar las variables de entorno en el archivo <code>.env.test</code> para configurar adecuadamente el entorno de desarrollo.</p>

<h2>Documentación</h2>

<p>La documentación de esta API está disponible en Swagger. Puede acceder a ella visitando:</p>

<ul>
  <li>Localmente: <code>http://localhost:#puerto/docs</code> (reemplace <code>#puerto</code> con el puerto en el que se está ejecutando el servidor local).</li>
  <li>En línea: <a href="https://api-ecommerce-beta-dev-qkxd.2.us-1.fl0.io/docs">Documentación en línea</a> (enlace rápido para la versión desplegada).</li>
</ul>

<p>¡Disfruta explorando la API de Ecommerce! Si tienes alguna pregunta o problema, no dudes en contactar al equipo de desarrollo.</p>





