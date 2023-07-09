# Diff Details

Date : 2023-05-30 00:13:07

Directory c:\\Users\\dell\\Desktop\\Projekt inżynierski\\poster.client

Total : 187 files,  14226 codes, -193 comments, -431 blanks, all 13602 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [Poster/poster.api/Controllers/AccountController.cs](/Poster/poster.api/Controllers/AccountController.cs) | C# | -188 | -48 | -38 | -274 |
| [Poster/poster.api/Controllers/AktywnosciController.cs](/Poster/poster.api/Controllers/AktywnosciController.cs) | C# | -69 | -46 | -13 | -128 |
| [Poster/poster.api/Controllers/BaseController.cs](/Poster/poster.api/Controllers/BaseController.cs) | C# | -15 | 0 | -3 | -18 |
| [Poster/poster.api/Controllers/KategorieController.cs](/Poster/poster.api/Controllers/KategorieController.cs) | C# | -53 | -27 | -8 | -88 |
| [Poster/poster.api/Controllers/MiastaController.cs](/Poster/poster.api/Controllers/MiastaController.cs) | C# | -46 | -27 | -8 | -81 |
| [Poster/poster.api/Controllers/MiejscaController.cs](/Poster/poster.api/Controllers/MiejscaController.cs) | C# | -65 | -33 | -9 | -107 |
| [Poster/poster.api/Controllers/PhotosController.cs](/Poster/poster.api/Controllers/PhotosController.cs) | C# | -47 | -31 | -12 | -90 |
| [Poster/poster.api/Controllers/UsersController.cs](/Poster/poster.api/Controllers/UsersController.cs) | C# | -60 | -39 | -18 | -117 |
| [Poster/poster.api/Extensions/ApplicationServiceExtensions.cs](/Poster/poster.api/Extensions/ApplicationServiceExtensions.cs) | C# | -59 | 0 | -7 | -66 |
| [Poster/poster.api/Extensions/IdentityServiceExtensions.cs](/Poster/poster.api/Extensions/IdentityServiceExtensions.cs) | C# | -57 | 0 | -8 | -65 |
| [Poster/poster.api/Program.cs](/Poster/poster.api/Program.cs) | C# | -42 | 0 | -12 | -54 |
| [Poster/poster.api/Properties/launchSettings.json](/Poster/poster.api/Properties/launchSettings.json) | JSON | -15 | 0 | -1 | -16 |
| [Poster/poster.api/Services/TokenService.cs](/Poster/poster.api/Services/TokenService.cs) | C# | -37 | 0 | -8 | -45 |
| [Poster/poster.api/appsettings.Development.json](/Poster/poster.api/appsettings.Development.json) | JSON | -13 | 0 | -1 | -14 |
| [Poster/poster.api/appsettings.json](/Poster/poster.api/appsettings.json) | JSON | -14 | 0 | -1 | -15 |
| [Poster/poster.api/poster.api.csproj](/Poster/poster.api/poster.api.csproj) | XML | -21 | 0 | -5 | -26 |
| [Poster/poster.application/Aktywnosci/Commands/AddAktywnoscPhoto.cs](/Poster/poster.application/Aktywnosci/Commands/AddAktywnoscPhoto.cs) | C# | -41 | 0 | -9 | -50 |
| [Poster/poster.application/Aktywnosci/Commands/CreateAktywnosc.cs](/Poster/poster.application/Aktywnosci/Commands/CreateAktywnosc.cs) | C# | -58 | 0 | -9 | -67 |
| [Poster/poster.application/Aktywnosci/Commands/DeleteAktywnosc.cs](/Poster/poster.application/Aktywnosci/Commands/DeleteAktywnosc.cs) | C# | -35 | 0 | -7 | -42 |
| [Poster/poster.application/Aktywnosci/Commands/DeleteAktywnoscPhoto.cs](/Poster/poster.application/Aktywnosci/Commands/DeleteAktywnoscPhoto.cs) | C# | -36 | 0 | -9 | -45 |
| [Poster/poster.application/Aktywnosci/Commands/SetMainAktywnoscPhoto.cs](/Poster/poster.application/Aktywnosci/Commands/SetMainAktywnoscPhoto.cs) | C# | -36 | 0 | -9 | -45 |
| [Poster/poster.application/Aktywnosci/Commands/UpdateAktywnosc.cs](/Poster/poster.application/Aktywnosci/Commands/UpdateAktywnosc.cs) | C# | -39 | 0 | -6 | -45 |
| [Poster/poster.application/Aktywnosci/Commands/UpdateAktywnoscUser.cs](/Poster/poster.application/Aktywnosci/Commands/UpdateAktywnoscUser.cs) | C# | -56 | 0 | -13 | -69 |
| [Poster/poster.application/Aktywnosci/DTOs/AktywnoscDTO.cs](/Poster/poster.application/Aktywnosci/DTOs/AktywnoscDTO.cs) | C# | -22 | 0 | -2 | -24 |
| [Poster/poster.application/Aktywnosci/DTOs/AktywnoscFilterDTO.cs](/Poster/poster.application/Aktywnosci/DTOs/AktywnoscFilterDTO.cs) | C# | -12 | 0 | -1 | -13 |
| [Poster/poster.application/Aktywnosci/DTOs/CreateAktywnoscDTO.cs](/Poster/poster.application/Aktywnosci/DTOs/CreateAktywnoscDTO.cs) | C# | -13 | 0 | -2 | -15 |
| [Poster/poster.application/Aktywnosci/DTOs/UpdateAktywnoscDTO.cs](/Poster/poster.application/Aktywnosci/DTOs/UpdateAktywnoscDTO.cs) | C# | -16 | 0 | -3 | -19 |
| [Poster/poster.application/Aktywnosci/Queries/GetAktywnoscById.cs](/Poster/poster.application/Aktywnosci/Queries/GetAktywnoscById.cs) | C# | -29 | 0 | -6 | -35 |
| [Poster/poster.application/Aktywnosci/Queries/GetAllAktywnosci.cs](/Poster/poster.application/Aktywnosci/Queries/GetAllAktywnosci.cs) | C# | -26 | 0 | -5 | -31 |
| [Poster/poster.application/Aktywnosci/Queries/GetFilteredAktywnosci.cs](/Poster/poster.application/Aktywnosci/Queries/GetFilteredAktywnosci.cs) | C# | -88 | 0 | -12 | -100 |
| [Poster/poster.application/Aktywnosci/Validators/CreateAktywnoscValidator.cs](/Poster/poster.application/Aktywnosci/Validators/CreateAktywnoscValidator.cs) | C# | -18 | 0 | -2 | -20 |
| [Poster/poster.application/Aktywnosci/Validators/UpdateAktywnoscValidator.cs](/Poster/poster.application/Aktywnosci/Validators/UpdateAktywnoscValidator.cs) | C# | -19 | 0 | -2 | -21 |
| [Poster/poster.application/Extensions/Result.cs](/Poster/poster.application/Extensions/Result.cs) | C# | -11 | 0 | -1 | -12 |
| [Poster/poster.application/Interfaces/IPhotoAccessor.cs](/Poster/poster.application/Interfaces/IPhotoAccessor.cs) | C# | -10 | 0 | -2 | -12 |
| [Poster/poster.application/Interfaces/IUserAccessor.cs](/Poster/poster.application/Interfaces/IUserAccessor.cs) | C# | -7 | 0 | -1 | -8 |
| [Poster/poster.application/Kategorie/Commands/CreateKategoria.cs](/Poster/poster.application/Kategorie/Commands/CreateKategoria.cs) | C# | -39 | 0 | -7 | -46 |
| [Poster/poster.application/Kategorie/Commands/DeleteKategoria.cs](/Poster/poster.application/Kategorie/Commands/DeleteKategoria.cs) | C# | -32 | 0 | -6 | -38 |
| [Poster/poster.application/Kategorie/Commands/UpdateKategoria.cs](/Poster/poster.application/Kategorie/Commands/UpdateKategoria.cs) | C# | -39 | 0 | -6 | -45 |
| [Poster/poster.application/Kategorie/DTOs/KategoriaDTO.cs](/Poster/poster.application/Kategorie/DTOs/KategoriaDTO.cs) | C# | -8 | 0 | -1 | -9 |
| [Poster/poster.application/Kategorie/Queries/GetAllKategorie.cs](/Poster/poster.application/Kategorie/Queries/GetAllKategorie.cs) | C# | -26 | 0 | -5 | -31 |
| [Poster/poster.application/Kategorie/Queries/GetKategoriaById.cs](/Poster/poster.application/Kategorie/Queries/GetKategoriaById.cs) | C# | -29 | 0 | -5 | -34 |
| [Poster/poster.application/Kategorie/Validators/KategoriaValidator.cs](/Poster/poster.application/Kategorie/Validators/KategoriaValidator.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.application/MappingProfiles/AktywnoscMappingProfile.cs](/Poster/poster.application/MappingProfiles/AktywnoscMappingProfile.cs) | C# | -29 | 0 | -6 | -35 |
| [Poster/poster.application/MappingProfiles/KategoriaMappingProfile.cs](/Poster/poster.application/MappingProfiles/KategoriaMappingProfile.cs) | C# | -14 | 0 | -2 | -16 |
| [Poster/poster.application/MappingProfiles/MiastoMappingProfile.cs](/Poster/poster.application/MappingProfiles/MiastoMappingProfile.cs) | C# | -15 | 0 | -2 | -17 |
| [Poster/poster.application/MappingProfiles/MiejsceMappingProfile.cs](/Poster/poster.application/MappingProfiles/MiejsceMappingProfile.cs) | C# | -17 | 0 | -3 | -20 |
| [Poster/poster.application/MappingProfiles/PhotoMappingProfile.cs](/Poster/poster.application/MappingProfiles/PhotoMappingProfile.cs) | C# | -14 | 0 | -2 | -16 |
| [Poster/poster.application/MappingProfiles/UsersMappingProfile.cs](/Poster/poster.application/MappingProfiles/UsersMappingProfile.cs) | C# | -17 | 0 | -2 | -19 |
| [Poster/poster.application/Miasta/Commands/CreateMiasto.cs](/Poster/poster.application/Miasta/Commands/CreateMiasto.cs) | C# | -39 | 0 | -7 | -46 |
| [Poster/poster.application/Miasta/Commands/DeleteMiasto.cs](/Poster/poster.application/Miasta/Commands/DeleteMiasto.cs) | C# | -32 | 0 | -6 | -38 |
| [Poster/poster.application/Miasta/Commands/UpdateMiasto.cs](/Poster/poster.application/Miasta/Commands/UpdateMiasto.cs) | C# | -39 | 0 | -6 | -45 |
| [Poster/poster.application/Miasta/DTOs/MiastoDTO.cs](/Poster/poster.application/Miasta/DTOs/MiastoDTO.cs) | C# | -9 | 0 | -2 | -11 |
| [Poster/poster.application/Miasta/Queries/GetAllMiasta.cs](/Poster/poster.application/Miasta/Queries/GetAllMiasta.cs) | C# | -26 | 0 | -5 | -31 |
| [Poster/poster.application/Miasta/Queries/GetMiastoById.cs](/Poster/poster.application/Miasta/Queries/GetMiastoById.cs) | C# | -29 | 0 | -5 | -34 |
| [Poster/poster.application/Miasta/Validators/MiastoValidator.cs](/Poster/poster.application/Miasta/Validators/MiastoValidator.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.application/Miejsca/Commands/CreateMiejsce.cs](/Poster/poster.application/Miejsca/Commands/CreateMiejsce.cs) | C# | -39 | 0 | -7 | -46 |
| [Poster/poster.application/Miejsca/Commands/DeleteMiejsce.cs](/Poster/poster.application/Miejsca/Commands/DeleteMiejsce.cs) | C# | -32 | 0 | -7 | -39 |
| [Poster/poster.application/Miejsca/Commands/UpdateMiejsce.cs](/Poster/poster.application/Miejsca/Commands/UpdateMiejsce.cs) | C# | -39 | 0 | -6 | -45 |
| [Poster/poster.application/Miejsca/DTOs/MiejsceDTO.cs](/Poster/poster.application/Miejsca/DTOs/MiejsceDTO.cs) | C# | -12 | 0 | -1 | -13 |
| [Poster/poster.application/Miejsca/Queries/GetAllMiejsca.cs](/Poster/poster.application/Miejsca/Queries/GetAllMiejsca.cs) | C# | -26 | 0 | -6 | -32 |
| [Poster/poster.application/Miejsca/Queries/GetMiejscaByMiastoId.cs](/Poster/poster.application/Miejsca/Queries/GetMiejscaByMiastoId.cs) | C# | -28 | 0 | -6 | -34 |
| [Poster/poster.application/Miejsca/Queries/GetMiejsceById.cs](/Poster/poster.application/Miejsca/Queries/GetMiejsceById.cs) | C# | -29 | 0 | -6 | -35 |
| [Poster/poster.application/Miejsca/Validators/MiejsceValidator.cs](/Poster/poster.application/Miejsca/Validators/MiejsceValidator.cs) | C# | -14 | 0 | -2 | -16 |
| [Poster/poster.application/Photos/Commands/AddPhoto.cs](/Poster/poster.application/Photos/Commands/AddPhoto.cs) | C# | -42 | 0 | -9 | -51 |
| [Poster/poster.application/Photos/Commands/DeletePhoto.cs](/Poster/poster.application/Photos/Commands/DeletePhoto.cs) | C# | -38 | 0 | -9 | -47 |
| [Poster/poster.application/Photos/Commands/SetMainPhoto.cs](/Poster/poster.application/Photos/Commands/SetMainPhoto.cs) | C# | -36 | 0 | -10 | -46 |
| [Poster/poster.application/Photos/DTOs/PhotoDTO.cs](/Poster/poster.application/Photos/DTOs/PhotoDTO.cs) | C# | -9 | 0 | -1 | -10 |
| [Poster/poster.application/Photos/PhotoUploadResult.cs](/Poster/poster.application/Photos/PhotoUploadResult.cs) | C# | -8 | 0 | -1 | -9 |
| [Poster/poster.application/Users/Commands/UpdateUser.cs](/Poster/poster.application/Users/Commands/UpdateUser.cs) | C# | -34 | 0 | -7 | -41 |
| [Poster/poster.application/Users/DTOs/ChangePasswordDTO.cs](/Poster/poster.application/Users/DTOs/ChangePasswordDTO.cs) | C# | -16 | 0 | -2 | -18 |
| [Poster/poster.application/Users/DTOs/LoginUserDTO.cs](/Poster/poster.application/Users/DTOs/LoginUserDTO.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.application/Users/DTOs/RegisterUserDTO.cs](/Poster/poster.application/Users/DTOs/RegisterUserDTO.cs) | C# | -15 | 0 | -2 | -17 |
| [Poster/poster.application/Users/DTOs/UpdateRoleDTO.cs](/Poster/poster.application/Users/DTOs/UpdateRoleDTO.cs) | C# | -7 | 0 | -1 | -8 |
| [Poster/poster.application/Users/DTOs/UpdateUserDTO.cs](/Poster/poster.application/Users/DTOs/UpdateUserDTO.cs) | C# | -15 | 0 | -2 | -17 |
| [Poster/poster.application/Users/DTOs/UserDTO.cs](/Poster/poster.application/Users/DTOs/UserDTO.cs) | C# | -20 | 0 | -2 | -22 |
| [Poster/poster.application/Users/Validators/ChangePasswordValidator.cs](/Poster/poster.application/Users/Validators/ChangePasswordValidator.cs) | C# | -21 | 0 | -4 | -25 |
| [Poster/poster.application/poster.application.csproj](/Poster/poster.application/poster.application.csproj) | XML | -19 | 0 | -6 | -25 |
| [Poster/poster.domain/Aktywnosc.cs](/Poster/poster.domain/Aktywnosc.cs) | C# | -19 | 0 | -3 | -22 |
| [Poster/poster.domain/AktywnoscUser.cs](/Poster/poster.domain/AktywnoscUser.cs) | C# | -11 | 0 | -1 | -12 |
| [Poster/poster.domain/Kategoria.cs](/Poster/poster.domain/Kategoria.cs) | C# | -9 | 0 | -1 | -10 |
| [Poster/poster.domain/Miasto.cs](/Poster/poster.domain/Miasto.cs) | C# | -10 | 0 | -1 | -11 |
| [Poster/poster.domain/Miejsce.cs](/Poster/poster.domain/Miejsce.cs) | C# | -13 | 0 | -1 | -14 |
| [Poster/poster.domain/Photo.cs](/Poster/poster.domain/Photo.cs) | C# | -13 | 0 | -1 | -14 |
| [Poster/poster.domain/User.cs](/Poster/poster.domain/User.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.domain/poster.domain.csproj](/Poster/poster.domain/poster.domain.csproj) | XML | -10 | 0 | -4 | -14 |
| [Poster/poster.infrastructure/Photos/CloudinarySettings.cs](/Poster/poster.infrastructure/Photos/CloudinarySettings.cs) | C# | -9 | 0 | -1 | -10 |
| [Poster/poster.infrastructure/Photos/PhotoAccessor.cs](/Poster/poster.infrastructure/Photos/PhotoAccessor.cs) | C# | -47 | 0 | -8 | -55 |
| [Poster/poster.infrastructure/Security/IsAdminRequirement.cs](/Poster/poster.infrastructure/Security/IsAdminRequirement.cs) | C# | -16 | 0 | -4 | -20 |
| [Poster/poster.infrastructure/Security/IsCurrentUserRequirement.cs](/Poster/poster.infrastructure/Security/IsCurrentUserRequirement.cs) | C# | -30 | 0 | -11 | -41 |
| [Poster/poster.infrastructure/Security/IsHostRequirement.cs](/Poster/poster.infrastructure/Security/IsHostRequirement.cs) | C# | -34 | 0 | -11 | -45 |
| [Poster/poster.infrastructure/Security/UserAccessor.cs](/Poster/poster.infrastructure/Security/UserAccessor.cs) | C# | -18 | 0 | -3 | -21 |
| [Poster/poster.infrastructure/poster.infrastructure.csproj](/Poster/poster.infrastructure/poster.infrastructure.csproj) | XML | -13 | 0 | -5 | -18 |
| [Poster/poster.persistance/Aktywnosci/Repositories/AktywnoscRepository.cs](/Poster/poster.persistance/Aktywnosci/Repositories/AktywnoscRepository.cs) | C# | -108 | 0 | -16 | -124 |
| [Poster/poster.persistance/Aktywnosci/Repositories/Interfaces/IAktywnoscRepository.cs](/Poster/poster.persistance/Aktywnosci/Repositories/Interfaces/IAktywnoscRepository.cs) | C# | -18 | 0 | -2 | -20 |
| [Poster/poster.persistance/DataContext.cs](/Poster/poster.persistance/DataContext.cs) | C# | -41 | 0 | -9 | -50 |
| [Poster/poster.persistance/Kategorie/Repositories/Interfaces/IKategorieRepository.cs](/Poster/poster.persistance/Kategorie/Repositories/Interfaces/IKategorieRepository.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.persistance/Kategorie/Repositories/KategorieRepository.cs](/Poster/poster.persistance/Kategorie/Repositories/KategorieRepository.cs) | C# | -46 | 0 | -10 | -56 |
| [Poster/poster.persistance/Miasta/Respositories/Interfaces/IMiastaRepository.cs](/Poster/poster.persistance/Miasta/Respositories/Interfaces/IMiastaRepository.cs) | C# | -12 | 0 | -2 | -14 |
| [Poster/poster.persistance/Miasta/Respositories/MiastaRepository.cs](/Poster/poster.persistance/Miasta/Respositories/MiastaRepository.cs) | C# | -48 | 0 | -10 | -58 |
| [Poster/poster.persistance/Miejsca/Repositories/Interfaces/IMiejscaRepository.cs](/Poster/poster.persistance/Miejsca/Repositories/Interfaces/IMiejscaRepository.cs) | C# | -13 | 0 | -2 | -15 |
| [Poster/poster.persistance/Miejsca/Repositories/MiejscaRepository.cs](/Poster/poster.persistance/Miejsca/Repositories/MiejscaRepository.cs) | C# | -55 | 0 | -11 | -66 |
| [Poster/poster.persistance/Migrations/20230529210117_InitialCreate.Designer.cs](/Poster/poster.persistance/Migrations/20230529210117_InitialCreate.Designer.cs) | C# | -381 | -2 | -144 | -527 |
| [Poster/poster.persistance/Migrations/20230529210117_InitialCreate.cs](/Poster/poster.persistance/Migrations/20230529210117_InitialCreate.cs) | C# | -367 | -3 | -42 | -412 |
| [Poster/poster.persistance/Migrations/DataContextModelSnapshot.cs](/Poster/poster.persistance/Migrations/DataContextModelSnapshot.cs) | C# | -379 | -1 | -144 | -524 |
| [Poster/poster.persistance/Seed/Seed.cs](/Poster/poster.persistance/Seed/Seed.cs) | C# | -48 | 0 | -5 | -53 |
| [Poster/poster.persistance/Seed/Seeders/AktywnosciSeed.cs](/Poster/poster.persistance/Seed/Seeders/AktywnosciSeed.cs) | C# | -64 | 0 | -2 | -66 |
| [Poster/poster.persistance/Seed/Seeders/MiastoSeed.cs](/Poster/poster.persistance/Seed/Seeders/MiastoSeed.cs) | C# | -219 | 0 | -3 | -222 |
| [Poster/poster.persistance/Seed/Seeders/UserSeed.cs](/Poster/poster.persistance/Seed/Seeders/UserSeed.cs) | C# | -12 | 0 | -3 | -15 |
| [Poster/poster.persistance/Users/Repository/Interfaces/IUsersRepository.cs](/Poster/poster.persistance/Users/Repository/Interfaces/IUsersRepository.cs) | C# | -14 | 0 | -2 | -16 |
| [Poster/poster.persistance/Users/Repository/UsersRepository.cs](/Poster/poster.persistance/Users/Repository/UsersRepository.cs) | C# | -85 | 0 | -14 | -99 |
| [Poster/poster.persistance/poster.persistance.csproj](/Poster/poster.persistance/poster.persistance.csproj) | XML | -17 | 0 | -5 | -22 |
| [poster.client/.VSCodeCounter/2023-05-30_00-11-37/details.md](/poster.client/.VSCodeCounter/2023-05-30_00-11-37/details.md) | Markdown | 74 | 0 | 6 | 80 |
| [poster.client/.VSCodeCounter/2023-05-30_00-11-37/diff-details.md](/poster.client/.VSCodeCounter/2023-05-30_00-11-37/diff-details.md) | Markdown | 9 | 0 | 6 | 15 |
| [poster.client/.VSCodeCounter/2023-05-30_00-11-37/diff.md](/poster.client/.VSCodeCounter/2023-05-30_00-11-37/diff.md) | Markdown | 12 | 0 | 7 | 19 |
| [poster.client/.VSCodeCounter/2023-05-30_00-11-37/results.json](/poster.client/.VSCodeCounter/2023-05-30_00-11-37/results.json) | JSON | 1 | 0 | 0 | 1 |
| [poster.client/.VSCodeCounter/2023-05-30_00-11-37/results.md](/poster.client/.VSCodeCounter/2023-05-30_00-11-37/results.md) | Markdown | 40 | 0 | 7 | 47 |
| [poster.client/README.md](/poster.client/README.md) | Markdown | 26 | 0 | 21 | 47 |
| [poster.client/package-lock.json](/poster.client/package-lock.json) | JSON | 13,256 | 0 | 1 | 13,257 |
| [poster.client/package.json](/poster.client/package.json) | JSON | 69 | 0 | 1 | 70 |
| [poster.client/public/index.html](/poster.client/public/index.html) | HTML | 20 | 23 | 1 | 44 |
| [poster.client/public/manifest.json](/poster.client/public/manifest.json) | JSON | 25 | 0 | 1 | 26 |
| [poster.client/src/app/api/agent.ts](/poster.client/src/app/api/agent.ts) | TypeScript | 153 | 0 | 13 | 166 |
| [poster.client/src/app/common/PhotoUploadWidget.tsx](/poster.client/src/app/common/PhotoUploadWidget.tsx) | TypeScript JSX | 125 | 0 | 15 | 140 |
| [poster.client/src/app/common/translations.ts](/poster.client/src/app/common/translations.ts) | TypeScript | 96 | 0 | 1 | 97 |
| [poster.client/src/app/components/Clock.jsx](/poster.client/src/app/components/Clock.jsx) | JavaScript JSX | 53 | 0 | 8 | 61 |
| [poster.client/src/app/components/Number.jsx](/poster.client/src/app/components/Number.jsx) | JavaScript JSX | 11 | 0 | 2 | 13 |
| [poster.client/src/app/components/Word.jsx](/poster.client/src/app/components/Word.jsx) | JavaScript JSX | 15 | 0 | 2 | 17 |
| [poster.client/src/app/components/clockStyles.module.css](/poster.client/src/app/components/clockStyles.module.css) | CSS | 101 | 0 | 18 | 119 |
| [poster.client/src/app/components/copyright.jsx](/poster.client/src/app/components/copyright.jsx) | JavaScript JSX | 14 | 0 | 3 | 17 |
| [poster.client/src/app/layout/App.tsx](/poster.client/src/app/layout/App.tsx) | TypeScript JSX | 39 | 0 | 6 | 45 |
| [poster.client/src/app/layout/LoadingComponent.tsx](/poster.client/src/app/layout/LoadingComponent.tsx) | TypeScript JSX | 20 | 0 | 4 | 24 |
| [poster.client/src/app/layout/NavBar.tsx](/poster.client/src/app/layout/NavBar.tsx) | TypeScript JSX | 266 | 0 | 10 | 276 |
| [poster.client/src/app/layout/styles.css](/poster.client/src/app/layout/styles.css) | CSS | 40 | 0 | 2 | 42 |
| [poster.client/src/app/models/aktywnosc.ts](/poster.client/src/app/models/aktywnosc.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [poster.client/src/app/models/aktywnoscFilter.ts](/poster.client/src/app/models/aktywnoscFilter.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [poster.client/src/app/models/kategoria.ts](/poster.client/src/app/models/kategoria.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [poster.client/src/app/models/miasto.ts](/poster.client/src/app/models/miasto.ts) | TypeScript | 4 | 0 | 1 | 5 |
| [poster.client/src/app/models/miejsce.ts](/poster.client/src/app/models/miejsce.ts) | TypeScript | 8 | 0 | 1 | 9 |
| [poster.client/src/app/models/user.ts](/poster.client/src/app/models/user.ts) | TypeScript | 41 | 0 | 6 | 47 |
| [poster.client/src/app/router/protectedRoute.tsx](/poster.client/src/app/router/protectedRoute.tsx) | TypeScript JSX | 11 | 0 | 4 | 15 |
| [poster.client/src/app/router/routes.tsx](/poster.client/src/app/router/routes.tsx) | TypeScript JSX | 74 | 0 | 3 | 77 |
| [poster.client/src/app/store/aktywnoscStore.ts](/poster.client/src/app/store/aktywnoscStore.ts) | TypeScript | 238 | 0 | 23 | 261 |
| [poster.client/src/app/store/commonStore.ts](/poster.client/src/app/store/commonStore.ts) | TypeScript | 24 | 0 | 6 | 30 |
| [poster.client/src/app/store/kategorieStore.ts](/poster.client/src/app/store/kategorieStore.ts) | TypeScript | 73 | 0 | 13 | 86 |
| [poster.client/src/app/store/miastaStore.ts](/poster.client/src/app/store/miastaStore.ts) | TypeScript | 73 | 0 | 13 | 86 |
| [poster.client/src/app/store/miejscaStore.ts](/poster.client/src/app/store/miejscaStore.ts) | TypeScript | 85 | 0 | 15 | 100 |
| [poster.client/src/app/store/store.ts](/poster.client/src/app/store/store.ts) | TypeScript | 27 | 0 | 4 | 31 |
| [poster.client/src/app/store/userStore.ts](/poster.client/src/app/store/userStore.ts) | TypeScript | 289 | 0 | 34 | 323 |
| [poster.client/src/features/aktywnosci/dashboard/AktywnoscListItem.tsx](/poster.client/src/features/aktywnosci/dashboard/AktywnoscListItem.tsx) | TypeScript JSX | 162 | 0 | 9 | 171 |
| [poster.client/src/features/aktywnosci/dashboard/AktywnoscListItemUsers.tsx](/poster.client/src/features/aktywnosci/dashboard/AktywnoscListItemUsers.tsx) | TypeScript JSX | 36 | 0 | 4 | 40 |
| [poster.client/src/features/aktywnosci/dashboard/AktywnosciDashboard.tsx](/poster.client/src/features/aktywnosci/dashboard/AktywnosciDashboard.tsx) | TypeScript JSX | 62 | 0 | 7 | 69 |
| [poster.client/src/features/aktywnosci/dashboard/AktywnosciFilters.tsx](/poster.client/src/features/aktywnosci/dashboard/AktywnosciFilters.tsx) | TypeScript JSX | 256 | 0 | 5 | 261 |
| [poster.client/src/features/aktywnosci/dashboard/AktywnosciList.tsx](/poster.client/src/features/aktywnosci/dashboard/AktywnosciList.tsx) | TypeScript JSX | 35 | 0 | 4 | 39 |
| [poster.client/src/features/aktywnosci/details/AktywnoscDetails.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscDetails.tsx) | TypeScript JSX | 53 | 1 | 7 | 61 |
| [poster.client/src/features/aktywnosci/details/AktywnoscDetailsChat.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscDetailsChat.tsx) | TypeScript JSX | 67 | 0 | 4 | 71 |
| [poster.client/src/features/aktywnosci/details/AktywnoscDetailsHeader.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscDetailsHeader.tsx) | TypeScript JSX | 94 | 0 | 4 | 98 |
| [poster.client/src/features/aktywnosci/details/AktywnoscDetailsInfo.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscDetailsInfo.tsx) | TypeScript JSX | 122 | 0 | 8 | 130 |
| [poster.client/src/features/aktywnosci/details/AktywnoscDetailsSidebar.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscDetailsSidebar.tsx) | TypeScript JSX | 124 | 0 | 5 | 129 |
| [poster.client/src/features/aktywnosci/details/AktywnoscPhoto.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscPhoto.tsx) | TypeScript JSX | 19 | 0 | 5 | 24 |
| [poster.client/src/features/aktywnosci/details/AktywnoscPhotoList.tsx](/poster.client/src/features/aktywnosci/details/AktywnoscPhotoList.tsx) | TypeScript JSX | 67 | 0 | 5 | 72 |
| [poster.client/src/features/aktywnosci/form/AktywnoscForm.tsx](/poster.client/src/features/aktywnosci/form/AktywnoscForm.tsx) | TypeScript JSX | 236 | 0 | 10 | 246 |
| [poster.client/src/features/errors/Forbidden.tsx](/poster.client/src/features/errors/Forbidden.tsx) | TypeScript JSX | 17 | 0 | 3 | 20 |
| [poster.client/src/features/errors/NotFound.tsx](/poster.client/src/features/errors/NotFound.tsx) | TypeScript JSX | 17 | 0 | 3 | 20 |
| [poster.client/src/features/errors/ValidationError.tsx](/poster.client/src/features/errors/ValidationError.tsx) | TypeScript JSX | 31 | 0 | 7 | 38 |
| [poster.client/src/features/homePage/HomePage.tsx](/poster.client/src/features/homePage/HomePage.tsx) | TypeScript JSX | 83 | 0 | 6 | 89 |
| [poster.client/src/features/kategorie/KategorieDashboard.tsx](/poster.client/src/features/kategorie/KategorieDashboard.tsx) | TypeScript JSX | 158 | 0 | 12 | 170 |
| [poster.client/src/features/kategorie/KategorieForm.tsx](/poster.client/src/features/kategorie/KategorieForm.tsx) | TypeScript JSX | 70 | 0 | 5 | 75 |
| [poster.client/src/features/miasta/MiastaDashboard.tsx](/poster.client/src/features/miasta/MiastaDashboard.tsx) | TypeScript JSX | 158 | 0 | 12 | 170 |
| [poster.client/src/features/miasta/MiastaForm.tsx](/poster.client/src/features/miasta/MiastaForm.tsx) | TypeScript JSX | 70 | 0 | 5 | 75 |
| [poster.client/src/features/miejsca/MiejscaDashboard.tsx](/poster.client/src/features/miejsca/MiejscaDashboard.tsx) | TypeScript JSX | 169 | 0 | 12 | 181 |
| [poster.client/src/features/miejsca/MiejscaForm.tsx](/poster.client/src/features/miejsca/MiejscaForm.tsx) | TypeScript JSX | 133 | 0 | 7 | 140 |
| [poster.client/src/features/users/LoginForm.tsx](/poster.client/src/features/users/LoginForm.tsx) | TypeScript JSX | 130 | 0 | 5 | 135 |
| [poster.client/src/features/users/PasswordChangeForm.tsx](/poster.client/src/features/users/PasswordChangeForm.tsx) | TypeScript JSX | 112 | 0 | 5 | 117 |
| [poster.client/src/features/users/RegisterForm.tsx](/poster.client/src/features/users/RegisterForm.tsx) | TypeScript JSX | 122 | 0 | 5 | 127 |
| [poster.client/src/features/users/dashboard/UsersDashboard.tsx](/poster.client/src/features/users/dashboard/UsersDashboard.tsx) | TypeScript JSX | 207 | 0 | 11 | 218 |
| [poster.client/src/features/users/profile/ProfileAktywnosci.tsx](/poster.client/src/features/users/profile/ProfileAktywnosci.tsx) | TypeScript JSX | 35 | 0 | 5 | 40 |
| [poster.client/src/features/users/profile/ProfileBio.tsx](/poster.client/src/features/users/profile/ProfileBio.tsx) | TypeScript JSX | 182 | 0 | 5 | 187 |
| [poster.client/src/features/users/profile/ProfileCard.tsx](/poster.client/src/features/users/profile/ProfileCard.tsx) | TypeScript JSX | 33 | 6 | 5 | 44 |
| [poster.client/src/features/users/profile/ProfileContent.tsx](/poster.client/src/features/users/profile/ProfileContent.tsx) | TypeScript JSX | 60 | 16 | 10 | 86 |
| [poster.client/src/features/users/profile/ProfileHeader.tsx](/poster.client/src/features/users/profile/ProfileHeader.tsx) | TypeScript JSX | 33 | 13 | 4 | 50 |
| [poster.client/src/features/users/profile/ProfilePage.tsx](/poster.client/src/features/users/profile/ProfilePage.tsx) | TypeScript JSX | 29 | 0 | 6 | 35 |
| [poster.client/src/features/users/profile/ProfilePhotosList.tsx](/poster.client/src/features/users/profile/ProfilePhotosList.tsx) | TypeScript JSX | 110 | 0 | 7 | 117 |
| [poster.client/src/index.tsx](/poster.client/src/index.tsx) | TypeScript JSX | 17 | 0 | 3 | 20 |
| [poster.client/src/react-app-env.d.ts](/poster.client/src/react-app-env.d.ts) | TypeScript | 0 | 1 | 1 | 2 |
| [poster.client/src/reportWebVitals.ts](/poster.client/src/reportWebVitals.ts) | TypeScript | 13 | 0 | 3 | 16 |
| [poster.client/src/setupTests.ts](/poster.client/src/setupTests.ts) | TypeScript | 1 | 4 | 1 | 6 |
| [poster.client/tsconfig.json](/poster.client/tsconfig.json) | JSON with Comments | 26 | 0 | 1 | 27 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details